import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer__content}>
          <div className={styles.footer__main}>
            <div className={styles.footer__logo}>
              <h2>Booklog</h2>
              <p>To nejlepší místo, kde mít četbu pod kontrolou.</p>
            </div>
            <div className={styles.footer__copyright}>
              <p>&copy; 2022 Kateřina Mašková, Tereza Plecitá</p>
            </div>
          </div>
          <div className={styles.footer__navigation}>
            <h5>Navigace</h5>
            <ul>
              <li>
                <Link href="/">
                  <a>Domů</a>
                </Link>
              </li>
              <li>
                <Link href="/navod">
                  <a>Návod</a>
                </Link>
              </li>
              <li>
                <Link href="/moje-knihy">
                  <a>Moje knihy</a>
                </Link>
              </li>
              <li>
                <Link href="/statistika">
                  <a>Statistika</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
