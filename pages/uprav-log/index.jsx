import {
  Modal,
  TextInput,
  Card,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/dist/client/image';

import { useState } from 'react';

import styles from './Uprav.module.css';
import CreateComment from '../../components/CreateComment/create-comment';
import Comment from '../../components/Comment/comment';
import CreateBookmark from '../../components/CreateBookmark/create-bookmark';

export default function Home() {
  const theme = useMantineTheme();
  const router = useRouter();
  console.log(router.query);
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const [opened, setOpened] = useState(false);
  const [openedBookmark, setOpenedBookmark] = useState(false);

  let text =
    "“Friends told me that the latest trend, at least in Europe, is public sex. They showed me some clips, and they're terrifying. A couple enters a streetcar, half-full, simply takes a seat, undresses, and starts to do it. You can see from surprised faces that it's not staged. It's pure working-class suburb. But what's fascinating is that the people all look, and then they politely ignore it. The message is that even if you're together in public with people, it still counts as private space.”";
  return (
    <>
      <div className={styles.book}>
        {router?.query?.imgUrl && (
          <Image
            className={styles.bookcover}
            width={200}
            height={200}
            src={
              router?.query?.imgUrl
                ? router?.query?.imgUrl
                : '/bookcover-icon.png'
            }
            alt="bookcover"
          />
        )}

        <div style={{ width: 500, margin: 'auto' }}>
          <Card className={styles.bookcard} shadow="sm" p="lg">
            <div>
              <Group
                position="apart"
                style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
              >
                <Text className={styles.booktitle} weight={500}>
                  {router?.query?.title}
                </Text>
                <Badge className={styles.booktag} color="pink" variant="light">
                  Přečteno
                </Badge>
                <Text className={styles.bookauthor} weight={300}>
                  {router?.query?.author}
                </Text>
              </Group>

              <Text
                className={styles.bookbio}
                size="sm"
                style={{ color: secondaryColor, lineHeight: 1.5 }}
              >
                {router?.query?.description}
              </Text>

              <Button
                onClick={() => setOpened(true)}
                className={styles.createbutton}
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 20 }}
              >
                Přidej komentář
              </Button>
              <Button
                onClick={() => setOpenedBookmark(true)}
                className={styles.createbutton}
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 20 }}
              >
                Vytvoř záložku
              </Button>
            </div>
            <section className={styles.comments}>
              <Comment
                title={'Rozklikni komentář'}
                dateCreated={'03. 06. 2022'}
                content={text}
              />
              <Comment
                title={'Rozklikni komentář'}
                dateCreated={'03. 06. 2022'}
                content={text}
              />
              <Comment
                title={'Rozklikni komentář'}
                dateCreated={'03. 06. 2022'}
                content={text}
              />
              <Comment
                title={'Rozklikni komentář'}
                dateCreated={'03. 06. 2022'}
                content={text}
              />
            </section>
          </Card>
        </div>
        <CreateComment opened={opened} setOpened={setOpened} />
        <CreateBookmark
          opened={openedBookmark}
          setOpenedBookmark={setOpenedBookmark}
        />
      </div>
    </>
  );
}
