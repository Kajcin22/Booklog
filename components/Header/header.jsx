import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchModal from '../SearchModal/search-modal';
import LogoutModal from '../Logout/logoutModal';
import { Burger } from '@mantine/core';

const TopHeader = () => {
  const router = useRouter();
  const [openedModal, setOpenedModal] = useState(false);
  const [openedSignout, setOpenedSignout] = useState(false);
  const [opened, setOpened] = useState(false);

  const title = opened ? 'Close navigation' : 'Open navigation';

  return (
    <>
      <header>
        <div className={styles.burgerWrapper}>
          {' '}
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            title={title}
          />
          {opened && (
            <ul className={styles.burgerMenu}>
              <li>
                <Link href="/navod">
                  <a
                    className={router.pathname == '/navod' ? styles.active : ''}
                  >
                    Návod
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
                <Link href="/statistika">
                  <a
                    className={
                      router.pathname == '/statistika' ? styles.active : ''
                    }
                  >
                    Statistika
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className={styles.header}>
          <div className={styles.header__logo}>
            <Link href="/">
              <a>Booklog</a>
            </Link>
          </div>
          <div className={styles.header__navigation}>
            <ul>
              <li>
                <Link href="/navod">
                  <a
                    className={router.pathname == '/navod' ? styles.active : ''}
                  >
                    Návod
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
                <Link href="/statistika">
                  <a
                    className={
                      router.pathname == '/statistika' ? styles.active : ''
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
              onClick={() => setOpenedModal(true)}
              src="/icon-search.svg"
              alt="hledej"
              width={35}
              height={35}
            />
            <Image
              onClick={() => setOpenedSignout(true)}
              src={'/logout_icon.png'}
              alt="prihlaseni"
              width={30}
              height={30}
            />
          </div>
        </div>
        <SearchModal opened={openedModal} setOpened={setOpenedModal} />
        <LogoutModal opened={openedSignout} setOpened={setOpenedSignout} />
      </header>
    </>
  );
};

export default TopHeader;
