import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import styles from '../BookCard/BookCard.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SearchResult = ({ imgUrl, author, title, description, setOpened }) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card className={styles.bookcard} shadow="sm" p="lg">
        <Card.Section>
          <Image
            width={150}
            height={150}
            className={styles.bookcover}
            src={imgUrl || '/bookcover-icon.png'}
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
          {/*  <Badge className={styles.booktag} color="pink" variant="light">
            Přečteno
          </Badge> */}
          <Text className={styles.bookauthor} weight={300}>
            {author}
          </Text>
        </Group>

        <Link
          href={`/uprav-log?${new URLSearchParams({
            author,
            title,
            imgUrl,
            description,
          })}`}
        >
          <Button
            onClick={() => setOpened(false)}
            className={styles.createbutton}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Přidat do mých knih
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default SearchResult;
