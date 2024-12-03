import React, { useEffect, useState } from 'react';
import { getAllBooks, deleteBook } from '../../Services/api';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch all books on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await getAllBooks();
                setBooks(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch books.');
            }
        };
        fetchBooks();
    }, []);

    // Handle book deletion
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(id);
                setBooks(books.filter((book) => book._id !== id)); // Remove the deleted book from state
                alert('Book deleted successfully!');
            } catch (err) {
                console.error(err);
                setError('Failed to delete book.');
            }
        }
    };

    // Navigate to the book details or edit page
    const handleViewEdit = (id, mode) => {
        if (mode === 'view') {
            navigate(`/books/${id}`);
        } else if (mode === 'edit') {
            navigate(`/books/edit/${id}`);
        }
    };

    return (
        <div>
            <h2>Book List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={() => navigate('/books/new')} style={{ marginBottom: '10px' }}>
                Add New Book
            </button>
            {books.length > 0 ? (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publication Year</th>
                            <th>Available</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td>{book.title || 'N/A'}</td>
                                <td>{book.author || 'N/A'}</td>
                                <td>{book.publicationYear || 'N/A'}</td>
                                <td>{book.available ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={() => handleViewEdit(book._id, 'view')}>View</button>
                                    <button onClick={() => handleViewEdit(book._id, 'edit')}>Edit</button>
                                    <button onClick={() => handleDelete(book._id)} style={{ color: 'red' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No books available.</p>
            )}
        </div>
    );
};

export default BookList;
