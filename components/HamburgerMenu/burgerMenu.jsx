import { Burger } from '@mantine/core';
import { useState } from 'react';
import styles from './Burger.module.css';
import { useRouter } from 'next/router';

import Link from 'next/link';

const HamburgerMenu = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

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
          <>
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
          </>
        ) : null}
      </div>
    </>
  );
};

export default HamburgerMenu;
