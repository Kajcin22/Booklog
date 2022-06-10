import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchModal from '../SearchModal/search-modal';
import LogoutModal from '../Logout/logoutModal';

const TopHeader = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [openedSignout, setOpenedSignout] = useState(false);

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
                <Link href="/domu">
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
              onClick={() => setOpened(true)}
              src="/icon-search.svg"
              alt="hledej"
              width={35}
              height={35}
            />
            <Image
              onClick={() => setOpenedSignout(true)}
              src={'/user_icon.png'}
              alt="prihlaseni"
              width={30}
              height={30}
            />
          </div>
        </div>
        <SearchModal opened={opened} setOpened={setOpened} />
        <LogoutModal opened={openedSignout} setOpened={setOpenedSignout} />
      </header>
    </>
  );
};

export default TopHeader;
