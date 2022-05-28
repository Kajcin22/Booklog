import styles from './Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

// import { Box, Group } from '@mantine/core';

const TopHeader = () => {
  const router = useRouter();

  return (
    <>
      <header>
        <div className={styles.header}>
          <div className={styles.header__logo}>
            <h1>Booklog</h1>
          </div>
          <div className={styles.header__navigation}>
            <ul>
              <li>
                <Link href="/">
                  <a className={router.pathname == '/' ? 'active' : ''}>Domů</a>
                </Link>
              </li>
              <li>
                <Link href="/domu">
                  <a className={router.pathname == '/domu' ? 'active' : ''}>
                    Vyhledat
                  </a>
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
            <button className={styles.header__btn}>Přihlásit se</button>
          </div>
        </div>
      </header>
    </>
    // {/* <header>
    // <Group
    /* sx={(theme) => ({
            display: 'flex',
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            textAlign: 'center',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            cursor: 'pointer',

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1],
            },
          })} */
    // >
    //   <div className={styles.header__logo}>
    //     <h1>Booklog</h1>
    //   </div>
    //   <ul style={{ listStyle: 'none' }}>
    //     <Group>
    //       <li>
    //         {' '}
    //         <Link href="/">
    //           <a>Domů</a>
    //         </Link>
    //       </li>
    //       <li>
    //         {' '}
    //         <Link href="/domu">
    //           <a>Dashboard</a>
    //         </Link>
    //       </li>
    //       <li>
    //         {' '}
    //         <Link href="/domu">
    //           <a>Dashboard</a>
    //         </Link>
    //       </li>
    //       <li>
    //         {' '}
    //         <Link href="/domu">
    //           <a>Dashboard</a>
    //         </Link>
    //       </li>
    //       <li>
    //         {' '}
    //         <Link href="/domu">
    //           <a>Dashboard</a>
    //         </Link>
    //       </li>
    //     </Group>
    //   </ul>
    //   <div className={styles.header_btn}>
    //     {/* <button className={styles.header_btn__new}>+</button> */}
    //     <button className={styles.header_btn__signin}>sign in</button>
    //   </div>
    // </Group>
    // </header> }
  );
};

export default TopHeader;
