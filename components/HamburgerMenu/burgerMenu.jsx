import { Burger } from '@mantine/core';
import { useState } from 'react';
import styles from './Burger.module.css';
import { useRouter } from 'next/router';

import Link from 'next/link';

const HamburgerMenu = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(null);

  const title = opened ? 'Zavřít menu' : 'Otevřít menu';

  return (
    <>
      <div className={styles.burgerWrapper}>
        {' '}
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          title={title}
          color="#035e7b"
        />
        {opened ? (
          <div className={styles.burgerMenu}>
            <ul>
              <li>
                <Link href="/navod">
                  <p
                    className={router.pathname == '/navod' ? styles.active : ''}
                    onClick={() => setOpened(false)}
                  >
                    Návod
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/moje-knihy">
                  <p
                    className={
                      router.pathname == '/moje-knihy' ? styles.active : ''
                    }
                    onClick={() => setOpened(false)}
                  >
                    Moje knihy
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/statistika">
                  <p
                    className={
                      router.pathname == '/statistika' ? styles.active : ''
                    }
                    onClick={() => setOpened(false)}
                  >
                    Statistika
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HamburgerMenu;
