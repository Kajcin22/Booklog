import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import userImg from './img/user_icon.jpg';
import { Modal, TextInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import SearchModal from '../SearchModal/search-modal';

const TopHeader = () => {
  const router = useRouter();
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
          <div className={styles.header__navigation}>
            <ul>
              <li>
                <Link href="/">
                  <a className={router.pathname == '/' ? styles.active : ''}>
                    Domů
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/moje-knihy">
                  <a
                    className={
                      router.pathname == '/moje-knihy' ? styles.active : ''
                    }
                  >
                    Moje knihy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/domu">
                  <a
                    className={router.pathname == '/domu' ? styles.active : ''}
                  >
                    Moje záložky
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/landing-page">
                  <a
                    className={
                      router.pathname == '/landing-page' ? styles.active : ''
                    }
                  >
                    Statistika
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.header__signIn}>
            <Image
              className={styles.header__btn}
              onClick={() => setOpened(true)}
              src="/icon-search.svg"
              alt="hledej"
              width={35}
              height={35}
            />
            <Image src={userImg} alt="prihlaseni" width={35} height={35} />
          </div>
        </div>
        <SearchModal opened={opened} setOpened={setOpened} />
      </header>
    </>
  );
};

export default TopHeader;