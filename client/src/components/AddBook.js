import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries'

function AddBook(props) {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [authorId, setAuthorId] = useState('')

  const displayAuthors = () => {
    const data = props.getAuthorsQuery
    if (data.loading) {
      return <option disabled>Loading authors...</option>
    }

    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ))
  }

  const submitForm = e => {
    e.preventDefault()
    const { addBookMutation } = props
    addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  return (
    <form id='add-book' onSubmit={submitForm}>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' onChange={e => setName(e.target.value)} />
      </div>

      <div className='field'>
        <label>Genre:</label>
        <input type='text' onChange={e => setGenre(e.target.value)} />
      </div>

      <div className='field'>
        <label>Author:</label>
        <select onChange={e => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>Add</button>
    </form>
  )
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)
