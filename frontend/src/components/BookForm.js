import { useState } from "react"
import { useBookContext } from "../hooks/useBookContext"
import { useAuthContext } from '../hooks/useAuthContext'

const BookForm = () => {
    const { dispatch } = useBookContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [price, setPrice] = useState('')
    const [yearPublished, setyearPublished] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = { title, author, price, yearPublished }

        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setAuthor('')
            setPrice('')
            setyearPublished('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_BOOK', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Book</h3>

            <label>Book Title :</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Author Name :</label>
            <input
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                className={emptyFields.includes('author') ? 'error' : ''}
            />

            <label>Book Price :</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error' : ''}
            />
            <label>Year Published :</label>
            <input
                type="number"
                onChange={(e) => setyearPublished(e.target.value)}
                value={yearPublished}
                className={emptyFields.includes('yearPublished') ? 'error' : ''}
            />

            <button>Add Book</button>
            {error && <div className="error">{error}</div>}
        </form>
    )



}

export default BookForm