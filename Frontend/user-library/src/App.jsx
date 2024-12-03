import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import BookList from './components/Library/BookList';
import BookForm from './components/Library/BookForm';
import BookDetails from './components/Library/BookDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


