import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { base_url } from "../constants";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${base_url}/books`);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      handleDelete(bookId);
    }
  };

  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>₹{book.price}</span>
            <button className="delete" onClick={() => confirmDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <div>
        <button className="addHome">
          <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
            Add new book
          </Link>
        </button>
      </div>

      <br />
      <br />
    </div>
  );
};

export default Books;
