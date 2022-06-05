import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BookPreview.module.css';
import { useEffect, useState } from 'react';

const BookPreview = ({ book }) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  console.log(book);

  return (
    <div className={styles.bookCard}>
      <Image
        width={150}
        height={200}
        src={book?.imgUrl || '/bookcover-icon.png'}
        alt="bookcover"
      />
      <h4 className={styles.bookTitle}>{book?.title}</h4>
      <p className={styles.bookAuthor}>{book?.author}</p>
    </div>
  );
};

export default BookPreview;
