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
  let text =
    "“Friends told me that the latest trend, at least in Europe, is public sex. They showed me some clips, and they're terrifying. A couple enters a streetcar, half-full, simply takes a seat, undresses, and starts to do it. You can see from surprised faces that it's not staged. It's pure working-class suburb. But what's fascinating is that the people all look, and then they politely ignore it. The message is that even if you're together in public with people, it still counts as private space.”";

  if (!singleBookResponse) {
    return null;
  }

  return (
    <>
      <div className={styles.bookView}>
        <div className={styles.bookMain}>
          <div className={styles.bookcover}>
            <Image
              width={200}
              height={300}
              src={singleBookResponse.imgUrl || '/bookcover-icon.png'}
              alt="bookcover"
            />
          </div>
          <div className={styles.bookinfo}>
            <div className={styles.bookcard}>
              <Group
                position="apart"
                style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
              >
                <Text className={styles.booktitle}>
                  {singleBookResponse.title}
                </Text>
                <SegmentedControl
                  value={value}
                  onChange={onStateUpdate}
                  data={[
                    { label: 'Chci si přečíst', value: 'A' },
                    { label: 'Čtu', value: 'B' },
                    { label: 'Přečteno', value: 'C' },
                  ]}
                />
                <Text className={styles.bookauthor} weight={300}>
                  {singleBookResponse.author}
                </Text>
              </Group>

              <Text
                className={styles.bookbio}
                size="sm"
                style={{ color: secondaryColor, lineHeight: 1.5 }}
              >
                {singleBookResponse.description}
              </Text>

              <Button
                onClick={() => setOpened(true)}
                className={styles.createbutton}
                fullWidth
              >
                Přidej komentář
              </Button>
              <Button
                onClick={() => setOpenedBookmark(true)}
                className={styles.createbutton}
                fullWidth
              >
                Vytvoř záložku
              </Button>
              <Button
                onClick={onDelete}
                variant="light"
                color="red"
                fullWidth
                style={{ marginTop: 20 }}
              >
                Odebrat knihu
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.comments}>
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
        <div className={styles.bookmarks}>
          {bookmarks && (
            <div className={styles.bookmarks_elm}>
              <p>{bookmarks.pageNum}</p>
            </div>
          )}
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
