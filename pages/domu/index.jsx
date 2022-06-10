import styles from './Domu.module.css';
import { useAuth } from '../../components/AuthProvider/auth-provider';

export default function Home() {
  const { session } = useAuth();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.welcome}>
          <h2>Vítej {session?.user?.email}</h2>
          <p>
            {' '}
            Tady bude návod na používání Booklogu - přejmenovat z Domů na Návod
            nebo whatever
          </p>
        </div>
      </div>
    </>
  );
}
