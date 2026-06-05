import styles from './About.module.css'

function About( {
    name,
    description,
}: {
    name: string,
    description: string,
}) {
    return (
        <section className={styles.section}>
            <h2>O mnie</h2>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.description}>{description}</p>
        </section>
    );
}

export default About