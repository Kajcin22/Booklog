import BookCard from '../../components/BookCard/book-card';
import styles from './LandingHeader.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '../../components/HeroSection';
import { Modal, TextInput, Group, Button } from '@mantine/core';
import LoginModal from '../../components/Login/login-modal';
import { useState } from 'react';

import SearchModal from '../../components/SearchModal/search-modal';
export default function LandingHeader() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <header>
        <div className={styles.header}>
          <div className={styles.header__logo}>
            <Link href="/">
              <a>Booklog</a>
            </Link>
          </div>

          <div className={styles.header__signIn}>
            <Image
              src={'/user_icon.png'}
              alt="prihlaseni"
              width={30}
              height={30}
            />
            <button
              onClick={() => setOpened(true)}
              className={styles.header__btn}
            >
              Přihlášení
            </button>
          </div>
        </div>
      </header>
      <LoginModal opened={opened} setOpened={setOpened} />
    </>
  );
}
