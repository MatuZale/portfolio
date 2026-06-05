import { useState } from 'react'
import styles from './ContactPage.module.css'

function ContactPage() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    console.log(form)
  }

  return (
    <main className={styles.ContactPageContainer}>
      <h2>Kontakt</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Imię:</label>
          <input
            type="text"
            className={styles.input}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            className={styles.input}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Wiadomość:</label>
          <textarea
            className={styles.input}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <button type="submit" className={styles.button}>Wyślij</button>
      </form>
    </main>
  )
}

export default ContactPage
