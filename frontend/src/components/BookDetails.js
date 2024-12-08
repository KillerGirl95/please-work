import { useBookContext } from '../hooks/useBookContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BookDetails = ({ Book }) => {
  const { dispatch } = useBookContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/' + Book._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
      
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_BOOK', payload: json})
    }
  }

  return (
    <div className="Book-details">
      <h4>{Book.title}</h4>
      <p><strong>Author : </strong>{Book.author}</p>
      <p><strong>Price : </strong>{Book.price}</p>
      <p><strong>Year Published : </strong>{Book.yearPublished}</p>
      <p>{formatDistanceToNow(new Date(Book.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default BookDetails