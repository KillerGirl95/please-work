import { BooksContext } from '../context/BookContext'
import { useContext } from 'react'

export const useBookContext = () => {
  const context = useContext(BooksContext)

  if (!context) {
    throw Error('useBookContext must be used inside an BooksContextProvider')
  }

  return context
}