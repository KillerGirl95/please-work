import { useState } from 'react';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';

const EditBookForm = ({ book, onClose }) => {
  const { dispatch } = useBookContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publishYear, setPublishYear] = useState(book.publishYear);
  const [price, setPrice] = useState(book.price);
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('You must be logged in');
      return;
    }

    const updatedBook = { title, author, publishYear, price };

    const response = await fetch(`${apiUrl}/api/${book._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedBook),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_BOOK', payload: json });
      onClose();
    } else {
      console.error('Failed to update book:', json);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Book</h3>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Author:</label>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <label>Publish Year:</label>
      <input type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} required />
      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditBookForm;
