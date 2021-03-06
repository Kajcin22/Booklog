import { Card, Tooltip } from '@mantine/core';
import Link from 'next/link';
import styles from './BookCard.module.css';
import Image from 'next/image';
import ReactStars from 'react-stars';

import { useAuth } from '../AuthProvider/auth-provider';

const BookCard = ({ book }) => {
  return (
    <>
      <Card className={styles.bookcard} shadow="sm" p="lg">
        <div>
          <Card.Section>
            <div
              style={{
                width: 150,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {book?.bookmark?.pageNum && (
                <div className={styles.bookmark}>{book?.bookmark?.pageNum}</div>
              )}
              <Image
                width={150}
                height={200}
                fit="contain"
                className={styles.bookcover}
                src={book.imgUrl || '/bookcover-icon.png'}
                alt="bookcover"
              />
            </div>
          </Card.Section>
          <div className={styles.bookcardWrapper}>
            <Tooltip
              label={book?.title}
              wrapLines
              withArrow
              width={200}
              color="blue"
              disabled={book?.title?.length < 27}
            >
              <div className={styles.booktitle}>{book?.title}</div>
            </Tooltip>

            <div
              style={{ backgroundColor: book?.readingState?.color }}
              className={styles.booktag}
            >
              {book?.readingState?.status}
            </div>

            <Tooltip
              label={book?.author}
              wrapLines
              withArrow
              width={200}
              color="blue"
              disabled={book?.author?.length < 23}
            >
              <div className={styles.bookauthor} weight={300}>
                {book?.author || 'Autor neznámý'}
              </div>
            </Tooltip>

            <div className={styles.bookRating}>
              <ReactStars
                edit={false}
                count={5}
                size={30}
                isHalf={false}
                color2={'#ffd700'}
                value={book?.rating}
              />
            </div>
          </div>
        </div>
        <div className={styles.createbutton_container}>
          <Link href={`/moje-knihy/${book?.id}`}>
            <button className={styles.createbutton}>Upravit</button>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default BookCard;
