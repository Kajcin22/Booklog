import '../styles/globals.css';
import Layout from '../components/Layout/layout';
import { AuthProvider } from '../components/AuthProvider/auth-provider';
import { AddedBooksProvider } from '../components/AddedBooksProvider/added-books-provider';
import 'swiper/css';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase_client';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // useEffect(() => {
  //   if (!supabase.auth.user() && router.pathname !== '/') {
  //     router?.push('/');
  //   }
  // }, [router?.pathname]);

  return (
    <AuthProvider>
      <AddedBooksProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AddedBooksProvider>
    </AuthProvider>
  );
}

export default MyApp;
