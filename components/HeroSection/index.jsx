import Image from 'next/image';
import styles from './Hero.module.css';
import LinkModal from '../LinkModal/link-modal';
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase_client';

const Hero = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className={styles.hero__section}>
        <div className={styles.hero__textcontent}>
          <h1>Kniha je okno do celého vesmíru</h1>
          <p>probuď své sny každodenním čtením</p>
          {!supabase.auth.user() ? (
            <button
              className={styles.header__btn}
              onClick={() => setOpened(true)}
            >
              Číst nyní!
            </button>
          ) : (
            <Link href="/moje-knihy">
              <button className={styles.header__btn}>Číst nyní!</button>
            </Link>
          )}
        </div>
        <div className={styles.hero__image}>
          <Image src="/hero_img.png" width={350} height={200} />
        </div>
        <LinkModal opened={opened} setOpened={setOpened} />
      </div>
    </>
  );
};

export default Hero;
