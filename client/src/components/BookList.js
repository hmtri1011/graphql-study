import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetail from './BookDetail'

function BookList(props) {
  const [selectedBook, setSelectedBook] = useState(null)

  const displayBooks = () => {
    const { data } = props
    if (data.loading) {
      return <div>Loading books...</div>
    }

    return data.books.map(book => (
      <li key={book.id} onClick={() => setSelectedBook(book.id)}>
        {book.name}
      </li>
    ))
  }

  return (
    <div>
      <ul className='book-list'>{displayBooks()}</ul>
      <BookDetail selectedBook={selectedBook} />
    </div>
  )
}

export default graphql(getBooksQuery)(BookList)
