import BookCard from '../../components/BookCard/book-card';
import styles from './Knihy.module.css';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase_client';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/AuthProvider/auth-provider';
import { getAllBookmarks } from '../../lib/api';
import Loader from '../../components/Loader/loader';
import { Input } from '@mantine/core';

const readingStates = {
  A: { status: 'Chci si přečíst', color: '#035e7b' },
  B: { status: 'Právě čtu', color: '#a2a77f' },
  C: { status: 'Přečteno', color: '#0795c5' },
};

export default function Home() {
  const [bookResponse, setBookResponse] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const [loader, setLoader] = useState(true);

  const router = useRouter();
  const { userId } = useAuth();

  const getBooks = async (searchQuery) => {
    const { data: library } = await supabase
      .from('Library')
      .select('bookId, readingState, rating')
      .eq('userId', userId);

    const bookIds = library?.map((it) => it?.bookId);

    const query = supabase?.from('Book')?.select()?.in('bookId', bookIds);

    if (searchQuery) {
      query?.or(`title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;

    const allBookmarks = await getAllBookmarks(userId);

    if (data) {
      const enrichedData = data.map((book) => {
        const { readingState: state, rating } =
          library?.find((item) => item?.bookId === book?.bookId) || {};
        const bookmark = allBookmarks?.find(
          (item) => parseInt(item?.bookId) === book?.id,
        );
        console.log(bookmark);
        return {
          ...book,
          readingState: {
            status: readingStates[state]?.status || 'Chci si přečíst',
            color: readingStates[state]?.color,
          },
          bookmark,
          rating,
        };
      });
      setBookResponse(enrichedData);
      setLoader(false);
    }
  };

  const getBookWithStatus = (condition) => {
    const filteredBooks = bookResponse?.filter(
      (book) => book?.readingState?.status === condition,
    );
    return !!filteredBooks?.length ? (
      filteredBooks?.map((book) => (
        <div key={book?.id} className={styles.bookCardWrapper}>
          <BookCard book={book} />
        </div>
      ))
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
          <Input
            type="text"
            placeholder="autor nebo název knihy"
            onChange={(event) => setSearchInput(event?.target?.value)}
          ></Input>
          <button onClick={onSearch}>Hledat</button>
        </div>
      </div>
      {loader ? (
        <div className={styles.sectionsWrapper}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.book_section}>
            <h2>Právě čtu</h2>
            <div className={styles.book_section_cards}>
              {getBookWithStatus('Právě čtu')}
            </div>
          </div>
          <div className={styles.book_section}>
            <h2>Chci si přečíst</h2>
            <div className={styles.book_section_cards}>
              {getBookWithStatus('Chci si přečíst')}
            </div>
          </div>
          <div className={styles.book_section}>
            <h2>Přečteno</h2>
            <div className={styles.book_section_cards}>
              {getBookWithStatus('Přečteno')}
            </div>
          </div>
        </>
      )}
    </>
  );
}
