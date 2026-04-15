const LINES = [
  '@RestController',
  '@RequestMapping("/api")',
  'public class ProjectController {',
  '',
  '  @Autowired',
  '  private ProjectService service;',
  '',
  '  @GetMapping("/projects")',
  '  public List<ProjectDto> getAll() {',
  '    return service.findAll();',
  '  }',
  '',
  '  @PostMapping("/projects")',
  '  public ResponseEntity<ProjectDto> create(',
  '    @RequestBody @Valid CreateProjectRequest req',
  '  ) {',
  '    return ResponseEntity.ok(service.create(req));',
  '  }',
  '}',
  '',
  'interface Project {',
  '  id: string',
  '  title: string',
  '  description: string',
  '  stack: string[]',
  '  createdAt: Date',
  '}',
  '',
  'export default function App() {',
  '  const [projects, setProjects] = useState<Project[]>([])',
  '',
  '  useEffect(() => {',
  '    fetch("/api/projects")',
  '      .then(r => r.json())',
  '      .then(setProjects)',
  '  }, [])',
  '',
  '  return (',
  '    <main>',
  '      {projects.map(p => (',
  '        <ProjectCard key={p.id} {...p} />',
  '      ))}',
  '    </main>',
  '  )',
  '}',
  '',
  'FROM eclipse-temurin:21-jre-alpine',
  'WORKDIR /app',
  'COPY target/*.jar app.jar',
  'EXPOSE 8080',
  'ENTRYPOINT ["java", "-jar", "app.jar"]',
  '',
  'CREATE TABLE projects (',
  '  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),',
  '  title       VARCHAR(255) NOT NULL,',
  '  stack       TEXT[],',
  '  created_at  TIMESTAMP DEFAULT NOW()',
  ');',
  '',
  'services:',
  '  backend:',
  '    build: .',
  '    ports: ["8080:8080"]',
  '  db:',
  '    image: postgres:16',
  '    environment:',
  '      POSTGRES_DB: weirdingcode',
]

export default function CodeBg() {
  // On duplique pour un scroll infini
  const all = [...LINES, ...LINES]

  return (
    <div style={{
      position:      'absolute',
      inset:         0,
      overflow:      'hidden',
      pointerEvents: 'none',
      zIndex:        0,
    }}>
      <div className="code-bg-scroll">
        {all.map((line, i) => (
          <div key={i} style={{
            fontFamily:  'JetBrains Mono, monospace',
            fontSize:    '0.72rem',
            lineHeight:  '1.9',
            color:       'rgba(255,255,255,0.045)',
            whiteSpace:  'pre',
            paddingLeft: 32,
          }}>
            {line || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  )
}
