import { Collapse, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import styles from './Bookmark.module.css';
import Link from 'next/link';

import { supabase } from '../../lib/supabase_client';
import { useAuth } from '../../components/AuthProvider/auth-provider';
import { useRouter } from 'next/router';
import { useAddedBooks } from '../../components/AddedBooksProvider/added-books-provider';

const Bookmark = ({ pageNum, dateCreated, bookTitle, bookId }) => {
  const router = useRouter();

  const { userId } = useAuth();
  const { singleBookResponse } = useAddedBooks();

  const onDeleteBookmark = async () => {
    await supabase.from('Bookmark').delete().eq('title', bookTitle);

    router.reload('/moje-zalozky');
  };

  return (
    <>
      <div className={styles.bookmark}>
        <button onClick={onDeleteBookmark} className={styles.delete_btn}>
          x
        </button>
        <div className={styles.bookmark_title}>
          <Link href={`/moje-knihy/${bookId}`}>
            <h2>{bookTitle}</h2>
          </Link>

          <p>vytvořeno: {dateCreated}</p>
        </div>
        <div className={styles.bookmark_page}>
          <p>
            <span className={styles.bookmark_pagenumb}>{pageNum}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
