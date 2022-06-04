import BookCard from '../../components/BookCard/book-card';
import styles from './LandingPage.module.css';
import Hero from '../../components/HeroSection';
import Login from '../../components/Login/login';
import LoginModal from '../../components/Login/login-modal';
import { useState } from 'react';
import { useForm } from '@mantine/form';

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="container">
        <Hero />
        <div className={styles.book_section}>
          <div className={styles.book_section_heading}>
            <h3>Populární knihy</h3>
            <p>procházet</p>
          </div>
          <div className={styles.book_section_cards}>
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
          </div>
        </div>
        <div className={styles.book_section}>
          <div className={styles.book_section_heading}>
            <h3>Naposledy čteno</h3>
            <p>procházet</p>
          </div>
          <div className={styles.book_section_cards}>
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
          </div>
        </div>
        <div className={styles.registrace}>
          <h1>Zaregistruj se nyní a měj svou četbu pod kontrolou!</h1>

          <Login />
        </div>
        <LoginModal />
      </div>
    </>
  );
}
