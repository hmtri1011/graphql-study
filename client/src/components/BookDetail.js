import React from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

function BookDetails(props) {
  const displayBookDetails = () => {
    const { book } = props.data
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>Genre: {book.genre}</p>
          <p>Author: {book.author.name}</p>
          <p>All books by {book.author.name}:</p>
          <ul className='other-books'>
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )
    }
  }

  return (
    <div>
      <p>Book details here: </p>
      {displayBookDetails()}
    </div>
  )
}

export default graphql(getBookQuery, {
  options: props => ({
    variables: {
      id: props.selectedBook
    }
  })
})(BookDetails)
