import styles from './Header.module.css';
import { Box, Group } from '@mantine/core';
import Link from 'next/link';

const TopHeader = () => {
  return (
    <>
      <header>
        <Group
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
        >
          <div className={styles.header__logo}>
            <h1>Booklog</h1>
          </div>
          <ul style={{ listStyle: 'none' }}>
            <Group>
              <li>
                {' '}
                <Link href="/">
                  <a>Domů</a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/domu">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/domu">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/domu">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/domu">
                  <a>Dashboard</a>
                </Link>
              </li>
            </Group>
          </ul>
          <div className={styles.header_btn}>
            {/* <button className={styles.header_btn__new}>+</button> */}
            <button className={styles.header_btn__signin}>sign in</button>
          </div>
        </Group>
      </header>
    </>
  );
};

export default TopHeader;
