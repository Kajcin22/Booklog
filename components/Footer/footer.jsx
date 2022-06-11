import Link from 'next/link';
import styles from './Footer.module.css';
import { useState } from 'react';
import LinkModal from '../LinkModal/link-modal';
import { supabase } from '../../lib/supabase_client';

const Footer = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer__content}>
          <div className={styles.footer__main}>
            <div className={styles.footer__logo}>
              <h2>Booklog</h2>
              <p>To nejlepší místo, kde mít četbu pod kontrolou.</p>
            </div>
            <div className={styles.footer__copyright}>
              <p>&copy; 2022 Kateřina Mašková, Tereza Plecitá</p>
            </div>
          </div>
          <div className={styles.footer__navigation}>
            <h5>Navigace</h5>
            <ul>
              <li>
                <Link href="/">
                  <p>Domů</p>
                </Link>
              </li>
              <li>
                <Link href="/navod">
                  <p>Návod</p>
                </Link>
              </li>
              <li>
                {!supabase.auth.user() ? (
                  <p
                    onClick={() => setOpened(true)}
                    className={styles.paragraph}
                  >
                    Moje knihy
                  </p>
                ) : (
                  <Link href="/moje-knihy">
                    <p>Moje knihy</p>
                  </Link>
                )}
              </li>
              <li>
                {!supabase.auth.user() ? (
                  <p
                    onClick={() => setOpened(true)}
                    className={styles.paragraph}
                  >
                    Statistika
                  </p>
                ) : (
                  <Link href="/statistika">
                    <p>Statistika</p>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <LinkModal opened={opened} setOpened={setOpened} />
        </div>
      </footer>
    </>
  );
};

export default Footer;
