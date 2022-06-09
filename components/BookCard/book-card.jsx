import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import styles from './BookCard.module.css';
import Image from 'next/image';
import ReactStars from 'react-stars';
import { useEffect, useState } from 'react';
import { useAddedBooks } from '../AddedBooksProvider/added-books-provider';
import { useAuth } from '../AuthProvider/auth-provider';
import { supabase } from '../../lib/supabase_client';

const BookCard = ({ book }) => {
  const [ratingValue, setRatingvalue] = useState(null);
  const { userId } = useAuth();
  const theme = useMantineTheme();
  const { getBook, singleBookResponse } = useAddedBooks();

  // const secondaryColor =
  //   theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  console.log(book);

  const onRating = async (newRating) => {
    const userRating = await supabase
      .from('Library')
      .update({ rating: newRating })
      .match({ userId, bookId: book?.bookId });
    console.log('Rating: ' + newRating);
    setRatingvalue(userRating?.data?.[0]?.rating);
  };

  return (
    <div style={{ width: 250 }}>
      <Card className={styles.bookcard} shadow="sm" p="lg">
        <div>
          <Card.Section>
            <div
              style={{
                width: 150,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {book?.bookmark?.pageNum && (
                <div className={styles.bookmark}>{book?.bookmark?.pageNum}</div>
              )}
              <Image
                width={150}
                height={200}
                fit="contain"
                className={styles.bookcover}
                src={book.imgUrl || '/bookcover-icon.png'}
                alt="bookcover"
              />
            </div>
          </Card.Section>
          <div className={styles.bookcardWrapper}>
            <div className={styles.booktitle}>{book.title}</div>

            <div
              style={{ backgroundColor: book?.readingState?.color }}
              className={styles.booktag}
            >
              {book?.readingState?.status}
            </div>

            <div className={styles.bookauthor} weight={300}>
              {book?.author || 'Autor neznámý'}
            </div>
            <div className={styles.bookRating}>
              <ReactStars
                onChange={onRating}
                edit={false}
                count={5}
                size={30}
                isHalf={false}
                color2={'#ffd700'}
                value={book?.rating}
              />
            </div>
          </div>
        </div>
        <div className={styles.createbutton_container}>
          <Link href={`/moje-knihy/${book.id}`}>
            <button className={styles.createbutton}>Upravit</button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default BookCard;
