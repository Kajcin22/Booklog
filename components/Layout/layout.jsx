import Footer from '../Footer/footer';
import TopHeader from '../Header/header';
import { supabase } from '../../lib/supabase_client';
import LandingHeader from '../LandingHeader';
import { useAuth } from '../AuthProvider/auth-provider';

const Layout = ({ children }) => {
  const { userId } = useAuth();

  return (
    <>
      <div style={{ width: '80%', margin: '0 auto' }}>
        {userId ? <TopHeader /> : <LandingHeader />}

        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
