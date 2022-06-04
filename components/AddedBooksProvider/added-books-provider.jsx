import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { supabase } from '../../lib/supabase_client';
import { useAuth } from '../AuthProvider/auth-provider';

const initialState = {
  addedBooks: null,
};

const AddedBooksContext = createContext(initialState);

export function AddedBooksProvider({ children }) {
  const [bookResponse, setBookResponse] = useState([]);
  const { session } = useAuth();

  const getBooks = async () => {
    const { data, error } = await supabase
      .from('Book')
      .select(`*,Library(userId)`)
      .eq('Library.userId', session?.user?.id)
      .order('created_at', { ascending: false });
    console.log({ data });
    console.log({ error });
    if (data) {
      setBookResponse(data);
    }
  };

  // useEffect(() => {
  //   getBooks();
  // }, []);

  const value = useMemo(
    () => ({
      bookResponse,
      getBooks,
    }),
    [bookResponse, getBooks],
  );

  return (
    <AddedBooksContext.Provider value={value}>
      {children}
    </AddedBooksContext.Provider>
  );
}

export const useAddedBooks = () => {
  const context = useContext(AddedBooksContext);
  if (!context) {
    throw Error(
      'You probably forget to wrap your components with AddedBooksProvider',
    );
  }
  return context;
};
