import React, { useState } from 'react';
import axios from 'axios';

const BookForm = ({ book }) => {
    const [title, setTitle] = useState(book?.title || '');
    const [author, setAuthor] = useState(book?.author || '');
    const [publicationYear, setPublicationYear] = useState(book?.publicationYear || '');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (book) {
                await axios.put(`http://localhost:5000/${book._id}`, { title, author, publicationYear }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post('http://localhost:5000/', { title, author, publicationYear }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            window.location.reload();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
            <input type="number" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} placeholder="Year" required />
            <button type="submit">{book ? 'Update' : 'Add'} Book</button>
        </form>
    );
};

export default BookForm;
