function About( {
    name,
    description,
}: {
    name: string,
    description: string,
}) {
    return (
        <section>
            <h2>O mnie</h2>
            <p>{name}</p>
            <p>{description}</p>
        </section>
    );
}

export default About