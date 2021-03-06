import styles from './SearchResult.module.css';
import Image from 'next/image';
import { supabase } from '../../lib/supabase_client';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthProvider/auth-provider';
import Loader from '../Loader/loader';
import { useState } from 'react';
import { Tooltip } from '@mantine/core';

const SearchResult = ({
  imgUrl,
  author,
  title,
  description,
  setOpened,
  bookId,
  pageNumber,
}) => {
  const router = useRouter();
  const { session } = useAuth();
  const [loader, setLoader] = useState(false);

  const onAddBook = async () => {
    setLoader(true);
    try {
      const { data: bookFound, error } = await supabase
        .from('Book')
        .select()
        .eq('bookId', bookId);
      if (bookFound.length === 0) {
        const { data, error } = await supabase?.from('Book')?.insert([
          {
            title,
            author,
            description,
            imgUrl,
            state: 'unread',
            bookId,
            pageNumber,
          },
        ]);
      }
      await supabase
        .from('Library')
        .insert([{ userId: session?.user?.id, bookId }]);
      if (!error) {
        setOpened(false);
        router.push(`/moje-knihy?q=${title}`);
      }
    } catch (err) {
      console.log(err);
    }
    setLoader(false);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={styles.bookcard}>
          <div className={styles.bookCover}>
            <Image
              width={150}
              height={200}
              fit="contain"
              className={styles.bookCover}
              src={imgUrl || '/bookcover-icon.png'}
              alt="bookcover"
            />
          </div>
          {title && (
            <Tooltip
              label={title}
              wrapLines
              withArrow
              width={200}
              color="blue"
              disabled={title?.length < 15}
            >
              <p className={styles.booktitle}>{title}</p>
            </Tooltip>
          )}
          {author && (
            <Tooltip
              label={author}
              wrapLines
              withArrow
              width={200}
              color="blue"
              disabled={author?.length < 15}
            >
              <p className={styles.bookauthor}>{author || 'Autor nezn??m??'}</p>
            </Tooltip>
          )}
          <button onClick={onAddBook} className={styles.createbutton}>
            P??idat do m??ch knih
          </button>
        </div>
      )}
    </>
  );
};

export default SearchResult;
