import { createContext, useContext, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase_client';
import { useAuth } from '../AuthProvider/auth-provider';

const initialState = {
  addedBooks: null,
};

const AddedBooksContext = createContext(initialState);

export function AddedBooksProvider({ children }) {
  const [bookResponse, setBookResponse] = useState([]);

  const [singleBookResponse, setSingleBookResponse] = useState(null);

  const getBook = async (id) => {
    const { data, error } = await supabase.from('Book').select().eq('id', id);
    setSingleBookResponse(data?.[0]);
  };

  const { session } = useAuth();

  const getBooks = async () => {
    const { data, error } = await supabase
      .from('Book')
      .select(`*,Library(userId)`)
      .eq('Library.userId', session?.user?.id)
      .order('created_at', { ascending: false });
    console.log({ error });
    if (data) {
      setBookResponse(data);
    }
  };

  const value = useMemo(
    () => ({
      bookResponse,
      getBooks,
      getBook,
      singleBookResponse,
    }),
    [bookResponse, getBooks, getBook, singleBookResponse],
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
