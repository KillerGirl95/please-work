import { useAuthContext } from './useAuthContext'
import { useBookContext } from './useBookContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchBooks } = useBookContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchBooks({ type: 'SET_BookS', payload: null })
  }

  return { logout }
}