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

export default function Home() {
  const theme = useMantineTheme();
  const router = useRouter();
  console.log(router.query);
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className={styles.book}>
        (
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
        )
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
                className={styles.createbutton}
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 20 }}
              >
                Vytvoř záložku
              </Button>
            </div>
          </Card>
        </div>
        <CreateComment opened={opened} setOpened={setOpened} />
      </div>
    </>
  );
}
