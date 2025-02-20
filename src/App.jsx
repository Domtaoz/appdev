import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const uri = 'https://didactic-space-invention-69v6vxv7gx72r4pq-5001.app.github.dev/';

  
  const fetchBooks = async () => {
    try {
      const respine = await axios.get(`${uri}/books`);
      setBooks(respine.data.books);  
    } catch (error) {
      console.error('Error fetching books:', error); 
    }
  };

  
  useEffect(() => {
    fetchBooks();
  }, []); 

  return (
    <div>
      <h1>Book List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td><img src={book.image_url} alt={book.title} width="50" /></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td><button>Edit</button><button>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
