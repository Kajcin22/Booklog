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
import bookIcon from './bookcover-icon.png';
import Image from 'next/dist/client/image';
import { useEffect, useState } from 'react';

const BookCard = ({ searchInput }) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const [imgUrl, setImgUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    /*za tím q= search word, po každém slovu to chce "+" */
    /*možná by šlo použít toto: 
    https://www.isbndb.com/apidocs/v2
    https://openlibrary.org/dev/docs/api/covers
    */
    fetch('https://www.googleapis.com/books/v1/volumes?q=intitle:babička')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let book = data.items[1].volumeInfo;
        console.log(book);
        /* setImgUrl(data.items[0].volumeInfo.imageLinks.thumbnail);*/
        setAuthor(book.authors);
        setTitle(book.title);
        setDescription(
          book.description === undefined
            ? '//popisek knížky//'
            : book.description,
        );
        console.log(imgUrl);
      });
  }, []);

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card className={styles.bookcard} shadow="sm" p="lg">
        <Card.Section>
          <Image
            layout="responsive"
            className={styles.bookcover}
            src={bookIcon}
            alt="bookcover"
          />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text className={styles.booktitle} weight={500}>
            {title}
          </Text>
          <Badge className={styles.booktag} color="pink" variant="light">
            Přečteno
          </Badge>
          <Text className={styles.bookauthor} weight={300}>
            {author}
          </Text>
        </Group>

        <Text
          className={styles.bookbio}
          size="sm"
          style={{ color: secondaryColor, lineHeight: 1.5 }}
        >
          {description}
        </Text>
        <Link href="/uprav-log">
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
