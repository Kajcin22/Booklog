import BookCard from '../../components/BookCard/book-card';
import styles from './LandingPage.module.css';
import Link from 'next/link';
import Image from 'next/image';

import { Modal, TextInput, Group, Button } from '@mantine/core';

import SearchModal from '../../components/SearchModal/search-modal';
export default function Home() {
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
            <button
              onClick={() => setOpened(true)}
              className={styles.header__btn}
            >
              Přihlášení
            </button>
            <Image
              src={'/user-icon.jpg'}
              alt="prihlaseni"
              width={35}
              height={35}
            />
          </div>
        </div>
      </header>
    </>
  );
}
