import { Box, Group } from '@mantine/core';
import Link from 'next/link';
import Footer from '../Footer/footer';
import TopHeader from '../Header/header';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase_client';
import LandingHeader from '../LandingHeader';

const Layout = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
  }, []);

  return (
    <>
      <div style={{ maxWidth: '80%', margin: '0 auto' }}>
        {session ? <TopHeader /> : <LandingHeader />}

        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
