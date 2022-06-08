import BookCard from '../../components/BookCard/book-card';
import styles from './Knihy.module.css';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase_client';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/AuthProvider/auth-provider';
import { getAllBookmarks } from '../../lib/api';

const readingStates = {
  A: { status: 'Chci si přečíst', color: 'green' },
  B: { status: 'Čtu', color: 'blue' },
  C: { status: 'Přečteno', color: 'red' },
};

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
  const { userId } = useAuth();

  const getBooks = async (searchQuery) => {
    const { data: library } = await supabase
      .from('Library')
      .select('bookId, readingState')
      .eq('userId', userId);

    const bookIds = library?.map((it) => it.bookId);

    const query = supabase.from('Book').select().in('bookId', bookIds);

    if (searchQuery) {
      query.or(`title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;

    const allBookmarks = await getAllBookmarks(userId);

    if (data) {
      const enrichedData = data.map((book) => {
        const state = library?.find(
          (item) => item.bookId === book.bookId,
        )?.readingState;
        const bookmark = allBookmarks?.find(
          (item) => parseInt(item.bookId) === book.id,
        );
        console.log(bookmark);
        return {
          ...book,
          readingState: {
            status: readingStates[state].status || 'Chci si přečíst',
            color: readingStates[state].color,
          },
          bookmark,
        };
      });
      setBookResponse(enrichedData);
    }
  };

  const getBookWithStatus = (condition) => {
    const filteredBooks = bookResponse?.filter(
      (book) => book.readingState.status === condition,
    );
    return !!filteredBooks.length ? (
      filteredBooks?.map((book) => <BookCard key={book.id} book={book} />)
    ) : (
      <p>V této kategorii nemáš žádné knihy.</p>
    );
  };

  const onSearch = () => {
    getBooks(searchInput);
  };

  useEffect(() => {
    if (userId) {
      getBooks();
    }
  }, [router?.query?.q, userId]);
  console.log(bookResponse);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <label>Vyhledat v mých knihách:</label>
          <input
            type="text"
            placeholder="autor nebo název knihy"
            onChange={(event) => setSearchInput(event.target.value)}
          ></input>
          <button onClick={onSearch}>Hledat</button>
        </div>
        <div className={styles.book_section}>
          <h2>Právě čtu</h2>
          <div className={styles.book_section_cards}>
            {getBookWithStatus('Čtu')}
          </div>
          <hr />
        </div>
        <div className={styles.book_section}>
          <h2>Chci si přečíst</h2>
          <div className={styles.book_section_cards}>
            {getBookWithStatus('Chci si přečíst')}
          </div>
          <hr />
        </div>
        <div className={styles.book_section}>
          <h2>Přečteno</h2>
          <div className={styles.book_section_cards}>
            {getBookWithStatus('Přečteno')}
          </div>
        </div>
      </div>
    </>
  );
}
