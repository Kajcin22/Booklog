import '../styles/globals.css';
import Layout from '../components/Layout/layout';
import { AuthProvider } from '../components/AuthProvider/auth-provider';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
