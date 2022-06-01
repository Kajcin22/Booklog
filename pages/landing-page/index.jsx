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
            <Image
              src={'/user-icon.jpg'}
              alt="prihlaseni"
              width={35}
              height={35}
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
      <div className="container">
        <div className={styles.hero_image}>
          <div>
            <h3>Kniha je okno do celého vesmíru</h3>
            <p>probuď své sny každodenním čtením</p>
            <button className={styles.header__btn}>Číst nyní!</button>
          </div>

          <Image src="/reading-book.png" width={250} height={200} />
        </div>
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
    </>
  );
}
