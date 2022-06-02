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
      {session ? <TopHeader /> : <LandingHeader />}

      {children}

      <Footer />
    </>
  );
};

export default Layout;
