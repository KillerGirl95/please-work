import { useEffect } from 'react'
import { useBookContext } from "../hooks/useBookContext"
import { useAuthContext } from "../hooks/useAuthContext"


// components
import BookDetails from '../components/BookDetails'
import BookForm from '../components/BookForm'
const apiUrl = process.env.REACT_APP_API_URL;
const Home = () => {
  const { Books, dispatch } = useBookContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${apiUrl}/api`, {
          headers: { 'Authorization': `Bearer ${user.token}` },
        })

        const json = await response.json()
        console.log('Fetched books:', json); // Log the response

        dispatch({ type: 'SET_BOOK', payload: json })

      } catch (error) {
        console.error('Error fetching books:', error);
      }

    };

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