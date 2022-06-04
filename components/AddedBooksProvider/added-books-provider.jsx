import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { supabase } from '../../lib/supabase_client';

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

  const getBooks = async (booksLimit) => {
    const { data, error } = await supabase
      .from('Book')
      .select()
      .order('created_at', { ascending: false })
      .limit(booksLimit);
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