import BookCard from '../../components/BookCard/book-card';
import styles from './Knihy.module.css';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase_client';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/AuthProvider/auth-provider';

const readingStates = { A: 'Chci si přečíst', B: 'Čtu', C: 'Přečteno' };
export default function Home() {
  const [bookResponse, setBookResponse] = useState([]);
  const [readingState, setReadingState] = useState(null);

  const router = useRouter();
  const { session } = useAuth();

  const getBooks = async () => {
    const { data: library, error: libraryError } = await supabase
      .from('Library')
      .select('bookId, readingState')
      .eq('userId', session?.user?.id);
    console.log({ library });
    const bookIds = library?.map((it) => it.bookId);

    const { data, error } = await supabase
      .from('Book')
      .select()
      .in('bookId', bookIds);

    if (data) {
      const enrichedData = data.map((book) => {
        const state = library?.find(
          (item) => item.bookId === book.bookId,
        )?.readingState;
        return {
          ...book,
          readingState: readingStates[state] || 'Chci si přečíst',
        };
      });
      setBookResponse(enrichedData);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      getBooks();
    }
  }, [router?.query?.q, session?.user?.id]);
  console.log(bookResponse);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.book_section}>
          <div className={styles.book_section_cards}>
            {bookResponse.map((book) => {
              return <BookCard key={book.id} book={book} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
