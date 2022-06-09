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
import { useEffect, useState } from 'react';

const BookCard = ({ book }) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  console.log(book);

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
              {book?.author}
            </div>
          </div>
        </div>
        <div>
          <Link href={`/moje-knihy/${book.id}`}>
            <button className={styles.createbutton}>Upravit</button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default BookCard;
