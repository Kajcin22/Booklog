import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <>
      <div className={styles.hero_image}>
        <div>
          <h3>Kniha je okno do celého vesmíru</h3>
          <p>probuď své sny každodenním čtením</p>
          <button className={styles.header__btn}>Číst nyní!</button>
        </div>
        <Image src="/hero_img.png" width={300} height={200} />
      </div>
    </>
  );
};

export default Hero;
