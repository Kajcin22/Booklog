import { Box, Group } from '@mantine/core';
import Link from 'next/link';
import Footer from '../Footer/footer';
import TopHeader from '../Header/header';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase_client';
import LandingHeader from '../LandingHeader';
import { useAuth } from '../AuthProvider/auth-provider';

const Layout = ({ children }) => {
  const { userId } = useAuth();

  return (
    <>
<<<<<<< HEAD
      <div style={{ maxWidth: '80%', margin: '0 auto' }}>
        {userId ? <TopHeader /> : <LandingHeader />}
=======
      <div style={{ width: '80%', margin: '0 auto' }}>
        {session ? <TopHeader /> : <LandingHeader />}
>>>>>>> f4d3411bbccd7dfe9e28ee7abdb5f4ca595dd4e2

        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
