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
    <div style={{ width: 250, marginLeft: 'auto', marginRight: 'auto' }}>
      <Card className={styles.bookcard} shadow="sm" p="lg">
        <Card.Section>
          <div
            style={{
              width: 150,
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingTop: 15,
            }}
          >
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

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text className={styles.booktitle} weight={500}>
            {book.title}
          </Text>
          <Badge className={styles.booktag} color="pink" variant="light">
            {book?.readingState}
          </Badge>

          <Text className={styles.bookauthor} weight={300}>
            {book.author}
          </Text>
        </Group>

        <Text
          className={styles.bookbio}
          size="sm"
          style={{ color: secondaryColor, lineHeight: 1.5 }}
        >
          {book.description}
        </Text>
        <Link href={`/moje-knihy/${book.id}`}>
          <Button
            className={styles.createbutton}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Uprav Log
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default BookCard;
