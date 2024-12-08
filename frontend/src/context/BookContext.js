import { createContext, useReducer } from 'react'

export const BooksContext = createContext()

export const BooksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOK':
            console.log('SET_BOOK payload:', action.payload);
            return {
                Books: action.payload
            }
        case 'CREATE_BOOK':
            return {
                Books: [action.payload, ...state.Books]
            }
        case 'DELETE_BOOK':
            return {
                Books: state.Books.filter((b) => b._id !== action.payload._id)
            }
        case 'UPDATE_BOOK':
            return {
                Books: state.Books.map((book) =>
                    book._id === action.payload._id ? action.payload : book
                )
            }
        default:
            return state
    }
}

export const BooksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BooksReducer, {
        Books: []       // init with empty array 
    })

    return (
        <BooksContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BooksContext.Provider>
    )
}