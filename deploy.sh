#!/usr/bin/env bash
set -euo pipefail

# ── Config ────────────────────────────────────────────────────────────────────
SERVER="root@82.165.190.75"
SSH_KEY="$HOME/.ssh/id_ed25519"
APP_NAME="weirding-code"
APP_DIR="/opt/$APP_NAME"
JAR_NAME="$APP_NAME-0.0.1-SNAPSHOT.jar"
DOMAIN="weirding-code.com"

SSH="ssh -i $SSH_KEY -o StrictHostKeyChecking=no"
SCP="scp -i $SSH_KEY -o StrictHostKeyChecking=no"

log() { echo -e "\n\033[1;36m▶ $1\033[0m"; }
ok()  { echo -e "\033[1;32m✔ $1\033[0m"; }
err() { echo -e "\033[1;31m✘ $1\033[0m" >&2; exit 1; }

# ── 1. Build frontend ─────────────────────────────────────────────────────────
log "Build frontend React..."
cd frontend
npm ci --silent
npm run build
cd ..
ok "Frontend buildé → frontend/dist/"

# ── 2. Copier le dist dans les resources Spring Boot ─────────────────────────
log "Copie du dist dans src/main/resources/static..."
rm -rf src/main/resources/static
cp -r frontend/dist src/main/resources/static
ok "Static files copiés"

# ── 3. Build Spring Boot jar ──────────────────────────────────────────────────
log "Build Maven (jar)..."
mvn clean package -DskipTests -q
ok "Jar buildé → target/$JAR_NAME"

# ── 4. Setup serveur (idempotent) ─────────────────────────────────────────────
log "Setup serveur (Java 21 + Nginx)..."
$SSH $SERVER bash <<'REMOTE'
set -e

# Java 21 (LTS, compatible Spring Boot 3.x)
if ! command -v java &>/dev/null; then
  apt-get update -qq
  apt-get install -y -qq openjdk-21-jre-headless
fi

# Nginx
if ! command -v nginx &>/dev/null; then
  apt-get install -y -qq nginx
fi

# Dossier app
mkdir -p /opt/weirding-code

echo "SETUP_OK"
REMOTE
ok "Serveur prêt"

# ── 5. Envoyer le jar ─────────────────────────────────────────────────────────
log "Upload du jar..."
$SCP "target/$JAR_NAME" "$SERVER:$APP_DIR/$JAR_NAME"
ok "Jar uploadé"

# ── 6. Systemd service ────────────────────────────────────────────────────────
log "Configuration du service systemd..."
$SSH $SERVER bash <<REMOTE
cat > /etc/systemd/system/$APP_NAME.service <<EOF
[Unit]
Description=Weirding Code — Spring Boot
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/java -jar $APP_DIR/$JAR_NAME
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=$APP_NAME
Environment="SPRING_PROFILES_ACTIVE=prod"

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable $APP_NAME
systemctl restart $APP_NAME
sleep 3
systemctl is-active $APP_NAME && echo "SERVICE_OK" || (journalctl -u $APP_NAME -n 20 && exit 1)
REMOTE
ok "Service Spring Boot lancé"

# ── 7. Nginx reverse proxy ────────────────────────────────────────────────────
log "Configuration Nginx..."
$SSH $SERVER bash <<REMOTE
SSL_CERT="/etc/letsencrypt/live/$DOMAIN/fullchain.pem"

if [ -f "\$SSL_CERT" ]; then
  # SSL dispo — config HTTPS complète
  cat > /etc/nginx/sites-available/$APP_NAME <<'EOF'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN www.$DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
    }
}
EOF
else
  # Pas encore de SSL — config HTTP simple
  cat > /etc/nginx/sites-available/$APP_NAME <<'EOF'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN _;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
    }
}
EOF
fi

ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/$APP_NAME
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx && echo "NGINX_OK"
REMOTE
ok "Nginx configuré"

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "\033[1;32m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\033[0m"
echo -e "\033[1;32m  DEPLOY OK → http://82.165.190.75\033[0m"
echo -e "\033[1;32m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\033[0m"
echo ""
echo "Logs Spring Boot : ssh $SERVER 'journalctl -u $APP_NAME -f'"
