<<<<<<< HEAD
import React, { useState } from "react";

const App = () => {
  const [fileContent, setFileContent] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [output, setOutput] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
        setFileExtension(file.name.split('.').pop()); // ✅ ดึง file extension
      };
      reader.readAsText(file);
    }
  };

  const handleCompile = async () => {
    try {
      const response = await fetch("http://localhost:5000/compile", { // ✅ ใช้ URL backend โดยตรง
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: fileContent, extension: fileExtension }), // ✅ ส่ง extension ไปด้วย
      });

      const result = await response.json();
      setOutput(result.output || result.error);
    } catch (error) {
      setOutput("Error: " + error.message);
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', image_url: ''});
  const [editBook, setEditBook] = useState(null);
  const uri = 'https://didactic-space-invention-69v6vxv7gx72r4pq-5001.app.github.dev/'
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${uri}/books`);
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (editBook) {
      setEditBook({ ...editBook, [name]: value });
    } else {
      setNewBook({ ...newBook, [name]: value });
    }
  };

  const handleCreateBook = async () => {
    try {
      const response = await axios.post(`${uri}/books`, newBook);
      setBooks([...books, response.data]);
      setNewBook({ title: '', author: '', image_url: '' }); // Clear the form
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const handleEditBook = (book) => {
    setEditBook({ ...book });
  };

  const handleUpdateBook = async () => {
    try {
      const response = await axios.put(`${uri}/books/${editBook.id}`, editBook);
      const updatedBooks = books.map((book) =>
        book.id === editBook.id ? response.data : book
      );
      setBooks(updatedBooks);
      setEditBook(null); // Clear edit mode
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${uri}/books/${bookId}`);
      const filteredBooks = books.filter((book) => book.id !== bookId);
      setBooks(filteredBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
>>>>>>> origin/test-front
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-xl font-bold mb-4 text-center">📂 อัปโหลดโค้ดและคอมไพล์</h1>
        <input
          type="file"
          accept=".py,.cpp"
          onChange={handleFileUpload}
          className="border p-2 rounded w-full"
        />
        {fileContent && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h2 className="font-semibold">📄 เนื้อหาไฟล์:</h2>
            <pre className="whitespace-pre-wrap text-gray-700">{fileContent}</pre>
          </div>
        )}
        <button
          onClick={handleCompile}
          className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
        >
          คอมไพล์โค้ด
        </button>
        {output && (
          <div className="mt-4 p-4 bg-gray-300 rounded">
            <h3 className="font-semibold">📤 ผลลัพธ์:</h3>
            <pre className="whitespace-pre-wrap text-gray-700">{output}</pre>
          </div>
        )}
      </div>
=======
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
              <td>
              {editBook && editBook.id === book.id ? (
                <input
                  type="text"
                  name="image_url"
                  value={editBook.image_url}
                  onChange={handleInputChange}
                />
                ) : (
                  <img src={book.image_url} alt={book.title} width="50" /> 
                )}
              </td>
              <td>
                {editBook && editBook.id === book.id ? (
                  <input
                    type="text"
                    name="title"
                    value={editBook.title}
                    onChange={handleInputChange}
                  />
                ) : (
                  book.title
                )}
              </td>
              <td>
                {editBook && editBook.id === book.id ? (
                  <input
                    type="text"
                    name="author"
                    value={editBook.author}
                    onChange={handleInputChange}
                  />
                ) : (
                  book.author
                )}
              </td>
              <td>
                {editBook && editBook.id === book.id ? (
                  <button onClick={handleUpdateBook}>Update</button>
                ) : (
                  <button onClick={() => handleEditBook(book)}>Edit</button>
                )}
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Book</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newBook.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={newBook.author}
        onChange={handleInputChange}
      />
      <input  
        type="text"
        name="image_url"
        placeholder="Image URL"
        value={newBook.image_url}
        onChange={handleInputChange}
      />
      <button onClick={handleCreateBook}>Create</button>
>>>>>>> origin/test-front
    </div>
  );
};

export default App;