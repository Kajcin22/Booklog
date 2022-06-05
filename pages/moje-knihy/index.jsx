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
  const [searchInput, setSearchInput] = useState(null);
  const [filtered, setFiltered] = useState([]);

  const condition2 = (book) =>
    book.author || book.title === searchInput || true;

  const showCorrectResult = (arr, condition1) =>
    arr
      ?.filter((book) => condition1 && condition2(book))
      ?.map((book) => {
        return <BookCard key={book.id} book={book} />;
      });

  const router = useRouter();
  const { session } = useAuth();

  const getBooks = async (searchQuery) => {
    const { data: library } = await supabase
      .from('Library')
      .select('bookId, readingState')
      .eq('userId', session?.user?.id);

    console.log({ library });
    const bookIds = library?.map((it) => it.bookId);

    const query = supabase.from('Book').select().in('bookId', bookIds);

    if (searchQuery) {
      query.or(`title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;

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

  const onSearch = () => {
    getBooks(searchInput);
  };

  useEffect(() => {
    if (session?.user?.id) {
      getBooks();
    }
  }, [router?.query?.q, session?.user?.id]);
  console.log(bookResponse, 'hledat', searchInput);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Vyhledat v mých knihách"
            onChange={(event) => setSearchInput(event.target.value)}
          ></input>
          <button onClick={onSearch}>Hledat</button>
        </div>
        <div className={styles.book_section}>
          <h2>Právě čtu</h2>
          <div className={styles.book_section_cards}>
            {bookResponse
              ?.filter((book) => book.readingState === 'Čtu')
              ?.map((book) => {
                return <BookCard key={book.id} book={book} />;
              })}
          </div>
        </div>
        <div className={styles.book_section}>
          <h2>Chci si přečíst</h2>
          <div className={styles.book_section_cards}>
            {bookResponse
              ?.filter((book) => book.readingState === 'Chci si přečíst')
              ?.map((book) => {
                return <BookCard key={book.id} book={book} />;
              })}
          </div>
        </div>
        <div className={styles.book_section}>
          <h2>Přečteno</h2>
          <div className={styles.book_section_cards}>
            {bookResponse
              ?.filter((book) => book.readingState === 'Přečteno')
              ?.map((book) => {
                return <BookCard key={book.id} book={book} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
