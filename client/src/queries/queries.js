import { gql } from 'apollo-boost'

const getBooksQuery = gql`
  query {
    books {
      id
      name
      genre
    }
  }
`

//$id:ID! mean ID is non null, $id:ID mean ID can be null
const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      name
      genre
      author {
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`

const getAuthorsQuery = gql`
  query {
    authors {
      id
      name
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`

export { getBooksQuery, getBookQuery, getAuthorsQuery, addBookMutation }
