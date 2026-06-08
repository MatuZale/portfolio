import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  name: string
  description: string | null
  html_url: string
  language: string | null
}

function ProjectCard({ name, description, html_url, language }: ProjectCardProps) {
  return (
    <div className={styles.projectCard}>
      <h3 className={styles.projectTitle}>{name}</h3>

      <p className={styles.projectDescription}>
        {description ?? 'Brak opisu'}
      </p>

      {language && (
        <p className={styles.projectLanguage}>
          {language}
        </p>
      )}

      {html_url && (
        <a
          className={styles.projectLink}
          href={html_url}
          target="_blank"
          rel="noreferrer"
        >
          Zobacz projekt
        </a>
      )}
    </div>
  )
}

export default ProjectCard