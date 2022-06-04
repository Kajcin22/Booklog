import BookCard from '../../components/BookCard/book-card';
import styles from './Knihy.module.css';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase_client';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/AuthProvider/auth-provider';

export default function Home() {
  const [bookResponse, setBookResponse] = useState([]);
  const router = useRouter();
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

  useEffect(() => {
    if (session?.user?.id) {
      getBooks();
    }
  }, [router?.query?.q]);
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
