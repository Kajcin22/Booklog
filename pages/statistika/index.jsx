import { useEffect, useState } from 'react';
import {
  getFinishedPages,
  getFinishedBooks,
  getBooksInProgress,
  getRecommendation,
} from '../../lib/api';
import { useAuth } from '../../components/AuthProvider/auth-provider';
import BookPreview from '../../components/BookPreview/book-preview';
import { Progress } from '@mantine/core';

export default function Home() {
  const { userId } = useAuth();

  const [finishedPages, setFinishedPages] = useState(null);
  const [finishedBooks, setFinishedBooks] = useState(null);
  const [booksInProgress, setBooksInProgress] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

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

  useEffect(() => {
    if (userId) {
      getRecommendation(userId).then((response) => setRecommendation(response));
    }
  }, [userId]);

  return (
    <>
      <h1>Statistika</h1>
      <h3>Celkem přečteno stránek: {finishedPages}</h3>
      <h3>Celkem přečteno knížek: {finishedBooks}</h3>
      <h3>Progres čtení:</h3>
      {booksInProgress?.map((book) => {
        const value = ((book.bookmark.pageNum / book.pageNumber) * 100).toFixed(
          2,
        );

        return (
          <div key={book.id}>
            <p>{book.title}</p>
            <Progress value={value} label={`${value}%`} size="xl" radius="xl" />
          </div>
        );
      })}

      <h3>Doporučení na další četbu:</h3>
      {recommendation?.map((book) => {
        return <BookPreview key={book.id} book={book} />;
      })}
    </>
  );
}
