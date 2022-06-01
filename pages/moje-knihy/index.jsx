import BookCard from '../../components/BookCard/book-card';
import styles from './Knihy.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </>
  );
}
