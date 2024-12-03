import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000');
                setBooks(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Library</h1>
            {books.map((book) => (
                <div key={book._id}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Year: {book.publicationYear}</p>
                    <p>Available: {book.available ? 'Yes' : 'No'}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
