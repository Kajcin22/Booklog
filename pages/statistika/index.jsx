import { useEffect, useState } from 'react';
import {
  getFinishedPages,
  getFinishedBooks,
  getBooksInProgress,
} from '../../lib/api';
import { useAuth } from '../../components/AuthProvider/auth-provider';

import { Progress } from '@mantine/core';

export default function Home() {
  const { userId } = useAuth();

  const [finishedPages, setFinishedPages] = useState(null);
  const [finishedBooks, setFinishedBooks] = useState(null);
  const [booksInProgress, setBooksInProgress] = useState(null);

  useEffect(() => {
    if (userId) {
      getFinishedPages(userId).then((response) => setFinishedPages(response));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getFinishedBooks(userId).then((response) => setFinishedBooks(response));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getBooksInProgress(userId).then((response) =>
        setBooksInProgress(response),
      );
    }
  }, [userId]);
  return (
    <>
      <h1>Statistika</h1>
      <h3>Celkem přečteno stránek: {finishedPages}</h3>
      <h3>Celkem přečteno knížek: {finishedBooks}</h3>
      {booksInProgress?.map((book) => {
        const value = ((book.bookmark.pageNum / book.pageNumber) * 100).toFixed(
          2,
        );

        return (
          <>
            <p>{book.title}</p>
            <Progress
              key={book.id}
              value={value}
              label={`${value}%`}
              size="xl"
              radius="xl"
            />
          </>
        );
      })}
    </>
  );
}
