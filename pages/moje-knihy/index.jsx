import BookCard from '../../components/BookCard';
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
