import { useState } from 'react';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const BookDetails = ({ Book }) => {
  const { dispatch } = useBookContext()
  const { user } = useAuthContext()

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(Book.title);
  const [author, setAuthor] = useState(Book.author);
  const [price, setPrice] = useState(Book.price);
  const [yearPublished, setYearPublished] = useState(Book.yearPublished);

  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/' + Book._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }

    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_BOOK', payload: json })
    }
  }
  const handleEdit = () => { setIsEditing(true); };
  const handleCancelEdit = () => { setIsEditing(false); };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) { return; }
    const updatedBook = { title, author, price, yearPublished };
    const response = await fetch('/api/' + Book._id, {
      method: 'PUT',
      body: JSON.stringify(updatedBook),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({
        type: 'UPDATE_BOOK', payload: json
      });
      setIsEditing(false);
    }
  };

  // return (
  //   <div className="Book-details">
  //     <h4>{Book.title}</h4>
  //     <p><strong>Author : </strong>{Book.author}</p>
  //     <p><strong>Price : </strong>{Book.price}</p>
  //     <p><strong>Year Published : </strong>{Book.yearPublished}</p>
  //     <p>{formatDistanceToNow(new Date(Book.createdAt), { addSuffix: true })}</p>
  //     <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
  //   </div>
  // )
  return (
    <div className="Book-details">
      {
        isEditing ? (
          <form onSubmit={handleUpdate}>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Author:</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required /> <label>Year Published:</label>
            <input type="number" value={yearPublished} onChange={(e) => setYearPublished(e.target.value)} required />
            <button type="submit">Update</button>
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </form>
        ) : (
          <>
            <h4>{Book.title}</h4>
            <p><strong>Author:</strong> {Book.author}</p>
            <p><strong>Price:</strong> {Book.price}</p>
            <p><strong>Year Published:</strong> {Book.yearPublished}</p>
            <p>{formatDistanceToNow(new Date(Book.createdAt), { addSuffix: true })}</p>
            <button onClick={handleEdit}>Edit</button>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
          </>
        )} </div>);
}


export default BookDetails;