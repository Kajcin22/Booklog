import Image from 'next/image';
import styles from './BookPreview.module.css';
import { Tooltip } from '@mantine/core';

const BookPreview = ({ book }) => {
  return (
    <div className={styles.bookCard}>
      <div className={styles.imageWrapper}>
        <Image
          width={150}
          height={200}
          layout="fixed"
          src={book?.imgUrl || '/bookcover-icon.png'}
          alt="bookcover"
          className={styles.cardImg}
        />{' '}
      </div>
      <Tooltip
        label={book?.title}
        wrapLines
        withArrow
        width={200}
        color="blue"
        disabled={book?.title?.length < 18}
      >
        <h4 className={styles.bookTitle}>{book?.title}</h4>
      </Tooltip>

      <Tooltip
        label={book?.author}
        wrapLines
        withArrow
        width={200}
        color="blue"
        disabled={book?.author?.length < 18}
      >
        <p className={styles.bookAuthor}>{book?.author || 'Autor neznámý'}</p>
      </Tooltip>
    </div>
  );
};

export default BookPreview;
