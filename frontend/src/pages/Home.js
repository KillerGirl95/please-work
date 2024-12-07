import { useEffect }from 'react'
import { useBookContext } from "../hooks/useBookContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import BookDetails from '../components/BookDetails'
import BookForm from '../components/BookForm'

const Home = () => {
  const {Books, dispatch} = useBookContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/Books', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_BookS', payload: json})
      }
    }

    if (user) {
      fetchBooks()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="Books">
        {Books && Books.map((Book) => (
          <BookDetails key={Book._id} Book={Book} />
        ))}
      </div>
      <BookForm />
    </div>
  )
}

export default Home