import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';

import styles from './Uprav.module.css';

export default function Home() {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <>
      <div className={styles.book}>
        <Image
          className={styles.bookcover}
          src="https://www.kindpng.com/picc/m/725-7251301_book-cover-placeholder-hd-png-download.png"
          height={250}
          alt="bookcover"
        />

        <div style={{ width: 500, margin: 'auto' }}>
          <Card className={styles.bookcard} shadow="sm" p="lg">
            <div>
              <Group
                position="apart"
                style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
              >
                <Text className={styles.booktitle} weight={500}>
                  //Jméno knihy//
                </Text>
                <Badge className={styles.booktag} color="pink" variant="light">
                  Přečteno
                </Badge>
                <Text className={styles.bookauthor} weight={300}>
                  //Jméno autora//
                </Text>
              </Group>

              <Text
                className={styles.bookbio}
                size="sm"
                style={{ color: secondaryColor, lineHeight: 1.5 }}
              >
                //krátké bio, obsah, cosi// Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quidem repudiandae porro sunt!
                Adipisci, eius! Dolor quas minima inventore cumque distinctio
                suscipit ipsum sequi veniam ducimus cum nemo quasi unde,
                praesentium explicabo laudantium tenetur a id quis est
                accusantium quaerat in?
              </Text>

              <Button
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
      </div>
    </>
  );
}
