import styles from './ProjectsPage.module.css'
import ProjectCard from '../components/ProjectCard'
import { useEffect, useState } from 'react'

export interface GitHubRepo {
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
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.description}
            html_url={project.html_url}
            language={project.language}
          />
        ))}
      </div>
    </main>
  )
}

export default ProjectsPage