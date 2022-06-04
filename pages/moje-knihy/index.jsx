import BookCard from '../../components/BookCard/book-card';
import styles from './Knihy.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.book_section_cards}>
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
    </>
  );
}
