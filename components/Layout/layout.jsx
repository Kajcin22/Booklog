import Footer from '../Footer/footer';
import TopHeader from '../Header/header';
import { supabase } from '../../lib/supabase_client';
import LandingHeader from '../LandingHeader';
import { useAuth } from '../AuthProvider/auth-provider';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const { userId } = useAuth();

  return (
    <>
      <div className={styles.contentWrapper}>
        {userId ? <TopHeader /> : <LandingHeader />}

        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
