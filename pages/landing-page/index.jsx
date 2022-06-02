import BookCard from '../../components/BookCard/book-card';
import styles from './LandingPage.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '../../components/HeroSection';
import { Modal, TextInput, Group, Button } from '@mantine/core';
import LoginModal from '../../components/Login/login-modal';
import { useState } from 'react';

import SearchModal from '../../components/SearchModal/search-modal';
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
          <form>
            <label>
              <input type="email" placeholder="zadej svůj email" />
              <button className={styles.header__btn}>Registrovat</button>
            </label>
          </form>
        </div>
      </div>
      <LoginModal opened={opened} setOpened={setOpened} />
    </>
  );
}
