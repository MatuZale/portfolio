import styles from './ProjectsPage.module.css'
import { useEffect, useState } from 'react'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
}

function ProjectsPage() {

  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/users/MatuZale/repos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Nie można pobrać repozytoriów')
        }
        return response.json()
      })
      .then(data => {
        setRepos(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <main><p>Ładowanie...</p></main>
  if (error) return <main><p>Błąd: {error}</p></main>

  return (
    <main>
      <h2>Projekty</h2>

      <div className={styles.projectsContainer}>
        {repos.map((project) => (
          <div className={styles.projectCard} key={project.id}>
            <h3 className={styles.projectTitle}>{project.name}</h3>

            <p className={styles.projectDescription}>
              {project.description ?? 'Brak opisu'}
            </p>

            {project.html_url && (
              <a
                className={styles.projectLink}
                href={project.html_url}
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
