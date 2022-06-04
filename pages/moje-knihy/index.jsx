import BookCard from '../../components/BookCard/book-card';
import styles from './Knihy.module.css';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase_client';
import { useRouter } from 'next/router';

export default function Home() {
  const [bookResponse, setBookResponse] = useState([]);
  const router = useRouter();

  const getBooks = async () => {
    const { data, error } = await supabase
      .from('Book')
      .select()
      .order('created_at', { ascending: false });
    console.log({ data });
    console.log({ error });
    if (data) {
      setBookResponse(data);
    }
  };

  useEffect(() => {
    getBooks();
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
