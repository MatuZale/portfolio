import styles from './ProjectsPage.module.css'

interface Project {
  id: number,
  title: string,
  description: string,
  url?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio",
    description: "Moje osobiste portfolio, które pokazuje moje umiejętności i doświadczenie.",
    url: "https://github.com/MatuZale/portfolio"
  },
  {
    id: 2,
    title: "Dashboard",
    description: "Aplikacja do monitorowania danych i statystyk w czasie rzeczywistym."
  }
]

function ProjectsPage() {
  return (
    <main>
      <h2>Projekty</h2>

      <div className={styles.projectsContainer}>
        {projects.map((project) => (
          <div className={styles.projectCard} key={project.id}>
            <h3 className={styles.projectTitle}>{project.title}</h3>

            <p className={styles.projectDescription}>
              {project.description}
            </p>

            {project.url && (
              <a
                className={styles.projectLink}
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                Zobacz projekt
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}

export default ProjectsPage
