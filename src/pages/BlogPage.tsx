import { useState, useEffect } from 'react'
// Zakładam, że backend API jest uruchomiony na localhost:5000 i ma endpoint GET /api/posts zwracający listę postów
interface Post { 
    id: number,
    title: string,
    content: string
    user_id: number,
    created_at: string
}
// Interfejs Post powinien odpowiadać strukturze danych zwracanej przez backend.
function BlogPage() {

    const [posts, setPosts] = useState<Post[]>([])
    // Stan przechowujący listę postów, początkowo pusty.
    useEffect(() => {
        fetch('http://localhost:5000/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(err => console.error('Błąd podczas pobierania postów:', err))
    }, [])

    return (
        <main>
            <h2>Blog</h2>
            {posts.length === 0 ? (
                <p>Brak postów do wyświetlenia.</p>
            ) : (
                posts.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>Opublikowano: {new Date(post.created_at).toLocaleDateString()}</small>
                    </div>
                ))
            )}
        </main>
    )
}

export default BlogPage