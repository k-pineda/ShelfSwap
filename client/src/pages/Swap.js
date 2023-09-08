import React, { useState } from 'react';

function SwapBooks() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [swapStatus, setSwapStatus] = useState('');


  const booksFromServer = [
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' },
    { id: 3, title: 'Book 3' },
  ];

   
  const handleBookSelection = (bookId) => {
    const isBookSelected = selectedBooks.includes(bookId);

    if (isBookSelected) {
     
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
 
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };


  const initiateSwap = () => {
    if (selectedBooks.length !== 2) {
      setSwapStatus('Select exactly 2 books to swap.');
      return;
    }

  };

  return (
    <div>
      <h1>Swap Books</h1>

      
      <form>
        {booksFromServer.map((book) => (
          <div key={book.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedBooks.includes(book.id)}
                onChange={() => handleBookSelection(book.id)}
              />
              {book.title}
            </label>
          </div>
        ))}
      </form>

      <button onClick={initiateSwap}>Initiate Swap</button>

  
      <p>{swapStatus}</p>
    </div>
  );
}

export default SwapBooks;
