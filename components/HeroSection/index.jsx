import Image from 'next/image';
import styles from './Hero.module.css';
import LoginModal from '../Login/login-modal';
import { useState } from 'react';

const Hero = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className={styles.hero__section}>
        <div className={styles.hero__textcontent}>
          <h3>Kniha je okno do celého vesmíru</h3>
          <p>probuď své sny každodenním čtením</p>
          <button
            onClick={() => setOpened(true)}
            className={styles.header__btn}
          >
            Číst nyní!
          </button>
        </div>
        <div className={styles.hero__image}>
          <Image src="/hero_img.png" width={350} height={200} />
        </div>
        <LoginModal opened={opened} setOpened={setOpened} />
      </div>
    </>
  );
};

export default Hero;
