import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import userImg from './img/user_icon.jpg';

const TopHeader = () => {
  const router = useRouter();

  return (
    <>
      <header>
        <div className={styles.header}>
          <div className={styles.header__logo}>
            <Link href="/">
              <a className={router.pathname == '/' ? 'active' : ''}>Booklog</a>
            </Link>
          </div>
          <div className={styles.header__navigation}>
            <ul>
              <li>
                <Link href="/">
                  <a className={router.pathname == '/' ? 'active' : ''}>Domů</a>
                </Link>
              </li>
              <li>
                <Link href="/moje-knihy">
                  <a
                    className={router.pathname == '/moje-knihy' ? 'active' : ''}
                  >
                    Moje knihy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/domu">
                  <a className={router.pathname == '/domu' ? 'active' : ''}>
                    Moje záložky
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/domu">
                  <a className={router.pathname == '/domu' ? 'active' : ''}>
                    Statistika
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.header__signIn}>
            <button className={styles.header__btn}>+</button>
            <Image src={userImg} alt="prihlaseni" width={35} height={35} />
          </div>
        </div>
      </header>
    </>
  );
};

export default TopHeader;
