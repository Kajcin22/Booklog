import {
  Modal,
  TextInput,
  Card,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
  SegmentedControl,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/dist/client/image';

import { useState, useEffect } from 'react';

import styles from './Uprav.module.css';
import CreateComment from '../../components/CreateComment/create-comment';
import Comment from '../../components/Comment/comment';
import CreateBookmark from '../../components/CreateBookmark/create-bookmark';
import { useAddedBooks } from '../../components/AddedBooksProvider/added-books-provider';

import { supabase } from '../../lib/supabase_client';
import { useAuth } from '../../components/AuthProvider/auth-provider';
import { getBookmark } from '../../lib/api';
import { getLibrary } from '../../lib/api';

import React from 'react';
import ReactStars from 'react-stars';

export default function Home() {
  const theme = useMantineTheme();
  const router = useRouter();
  const { userId } = useAuth();
  const { getBook, singleBookResponse } = useAddedBooks();
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const [opened, setOpened] = useState(false);
  const [openedBookmark, setOpenedBookmark] = useState(false);
  const [value, setValue] = useState('react');
  const [comments, setComments] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [ratingValue, setRatingvalue] = useState(null);

  useEffect(() => {
    if (router.query.id) {
      getBook(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (singleBookResponse && userId) {
      getLibrary(userId, singleBookResponse?.bookId).then((response) =>
        setValue(response?.readingState),
      );
    }
  }, [singleBookResponse, userId]);

  const getComment = async () => {
    const { data } = await supabase
      .from('Comment')
      .select()
      .eq('userId', userId)
      .eq('bookId', singleBookResponse.bookId);

    setComments(data);
  };

  useEffect(() => {
    if (userId && singleBookResponse?.bookId) {
      getComment();
    }
  }, [userId, singleBookResponse?.bookId]);

  useEffect(() => {
    if (userId && router?.query?.id) {
      getBookmark(userId, router?.query?.id).then((response) =>
        setBookmarks(response),
      );
    }
  }, [userId, router?.query?.id]);

  const onDelete = async () => {
    await supabase
      .from('Bookmark')
      .delete()
      .eq('title', singleBookResponse.title);
    await supabase
      .from('Library')
      .delete()
      .eq('userId', userId)
      .eq('bookId', singleBookResponse.bookId);
    await supabase.from('Book').delete().eq('id', router.query.id);
    router.push('/moje-knihy');
  };

  const onStateUpdate = async (value) => {
    const response = await supabase
      .from('Library')
      .update({ readingState: value })
      .match({ userId, bookId: singleBookResponse.bookId });
    setValue(response?.data?.[0]?.readingState);
  };

  const onRating = async (newRating) => {
    const userRating = await supabase
      .from('Library')
      .update({ rating: newRating })
      .match({ userId, bookId: singleBookResponse.bookId });
    console.log('Rating: ' + newRating);
    setRatingvalue(userRating?.data?.[0]?.rating);
    console.log('ratingValue: ' + ratingValue);
  };

  if (!singleBookResponse) {
    return null;
  }

  return (
    <>
      <div className={styles.bookView}>
        <div className={styles.bookMain}>
          <div className={styles.bookCover}>
            <Image
              width={200}
              height={300}
              src={singleBookResponse.imgUrl || '/bookcover-icon.png'}
              alt="bookcover"
            />
          </div>
          <div className={styles.bookinfo}>
            <div className={styles.booktitle}>{singleBookResponse.title}</div>
            <div className={styles.bookReadingStatus}>
              <SegmentedControl
                value={value}
                onChange={onStateUpdate}
                data={[
                  { label: 'Chci si přečíst', value: 'A' },
                  { label: 'Čtu', value: 'B' },
                  { label: 'Přečteno', value: 'C' },
                ]}
              />
              <ReactStars
                onChange={onRating}
                edit={true}
                count={5}
                size={30}
                isHalf={false}
                color2={'#ffd700'}
                value={ratingValue}
              />
            </div>
            <div className={styles.bookauthor}>{singleBookResponse.author}</div>

            <div className={styles.bookbio}>
              {singleBookResponse.description}
            </div>

            <button className={styles.buttonDelete} onClick={onDelete}>
              Odebrat knihu
            </button>
          </div>
        </div>
        <div className={styles.commentsBookmarks}>
          <div className={styles.bookmarks}>
            <div className={styles.bookmarksMain}>
              <h2>Záložka</h2>
              <button
                onClick={() => setOpenedBookmark(true)}
                className={styles.createbutton}
              >
                +
              </button>
            </div>
            {bookmarks && (
              <div className={styles.bookmarks_elm}>
                <p>{bookmarks.pageNum}</p>
              </div>
            )}
          </div>
          <div className={styles.comments}>
            <div className={styles.commentsMain}>
              <h2>Poznámky</h2>
              <button
                onClick={() => setOpened(true)}
                className={styles.createbutton}
              >
                +
              </button>
            </div>
            {comments &&
              comments.length > 0 &&
              comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    title={comment.title}
                    content={comment.content}
                    page={comment.pageNum}
                    id={comment.id}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <CreateComment
        opened={opened}
        setOpened={setOpened}
        bookId={singleBookResponse.bookId}
        userId={userId}
      />
      <CreateBookmark
        opened={openedBookmark}
        setOpenedBookmark={setOpenedBookmark}
        bookTitle={singleBookResponse.title}
        bookId={singleBookResponse.id}
      />
    </>
  );
}
