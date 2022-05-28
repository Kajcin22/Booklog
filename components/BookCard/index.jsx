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

const BookCard = ({ title, author, badge, imgUrl }) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card className={styles.bookcard} shadow="sm" p="lg">
        <Card.Section>
          <Image
            layout="responsive"
            className={styles.bookcover}
            height="auto"
            src={bookIcon}
            alt="bookcover"
          />
        </Card.Section>

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
          //krátké bio, obsah, cosi// Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quidem repudiandae porro sunt! Adipisci, eius! Dolor
          quas minima inventore cumque distinctio suscipit ipsum sequi veniam
          ducimus cum nemo quasi unde, praesentium explicabo laudantium tenetur
          a id quis est accusantium quaerat in?
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
