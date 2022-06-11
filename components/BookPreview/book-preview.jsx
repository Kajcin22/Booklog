import Image from 'next/image';
import styles from './BookPreview.module.css';

const BookPreview = ({ book }) => {
  console.log(book);

  return (
    <div className={styles.bookCard}>
      <Image
        width={150}
        height={200}
        src={book?.imgUrl || '/bookcover-icon.png'}
        alt="bookcover"
      />
      <h4 className={styles.bookTitle}>{book?.title}</h4>
      <p className={styles.bookAuthor}>{book?.author || 'Autor neznámý'}</p>
    </div>
  );
};

export default BookPreview;
