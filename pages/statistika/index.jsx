import { useEffect, useState } from 'react';
import {
  getFinishedPages,
  getFinishedBooks,
  getBooksInProgress,
  getRecommendation,
} from '../../lib/api';
import { useAuth } from '../../components/AuthProvider/auth-provider';
import Recommendation from '../../components/RecommendationBook/recommendation';
import { Progress } from '@mantine/core';
import Loader from '../../components/Loader/loader';

import styles from './Statistika.module.css';

export default function Home() {
  const { userId } = useAuth();

  const [finishedPages, setFinishedPages] = useState(null);
  const [finishedBooks, setFinishedBooks] = useState(null);
  const [booksInProgress, setBooksInProgress] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (userId) {
      getFinishedPages(userId)?.then((response) => setFinishedPages(response));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getFinishedBooks(userId)?.then((response) => setFinishedBooks(response));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getBooksInProgress(userId)?.then((response) =>
        setBooksInProgress(response),
      );
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getRecommendation(userId)?.then((response) =>
        setRecommendation(response),
      );
    }
  }, [userId]);
  console.log(recommendation, 'recommend');

  return (
    <>
      <div className={styles.statistika}>
        <div className={styles.statistika_main}>
          <h1>Čtenářská statistika</h1>
          <div className={styles.statistika_main_section}>
            <div className={styles.statistika_main_sectionElm}>
              <h3>
                Celkem přečteno{' '}
                <span className={styles.statistika_num}>{finishedPages}</span>{' '}
                stránek
              </h3>
              <button className={styles.statistika_icon_page}></button>
            </div>
            <div className={styles.statistika_main_sectionElm}>
              <button className={styles.statistika_icon_book}></button>
              <h3>
                z celkem přečtených{' '}
                <span className={styles.statistika_num}>{finishedBooks}</span>{' '}
                knížek.
              </h3>
            </div>
          </div>
        </div>
        <br />
        <div className={styles.statistika_section}>
          <h2>Progres čtení:</h2>
          {booksInProgress?.map((book) => {
            const value = (
              (book?.bookmark?.pageNum / book?.pageNumber) *
              100
            ).toFixed(2);

            return (
              <div key={book?.id}>
                <p>{book?.title}</p>
                <br />
                <Progress
                  value={value}
                  label={`${value}%`}
                  size="xl"
                  radius="xl"
                  color="#035e7b"
                />
              </div>
            );
          })}
        </div>
        <br />
        <div className={styles.statistika_section}>
          <h2>Doporučení na další četbu:</h2>
        </div>
        {recommendation?.recommendation?.length === 0 ? (
          <p className={styles.recommendationParagraph}>
            Momentálně nemáme co doporučit.
          </p>
        ) : recommendation?.status === 200 ? (
          <div className={styles.statistika_sectionRecommendation}>
            {recommendation?.recommendation?.map((book) => {
              return (
                <Recommendation
                  imgUrl={book?.imgUrl}
                  author={book?.author || 'Autor neznámý'}
                  title={book?.title}
                  description={book?.description}
                  bookId={book?.bookId}
                  setOpened={() => {}}
                  pageNumber={book?.pageNumber}
                  key={book?.id}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}
