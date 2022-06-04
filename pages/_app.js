import '../styles/globals.css';
import Layout from '../components/Layout/layout';
import { AuthProvider } from '../components/AuthProvider/auth-provider';
import { AddedBooksProvider } from '../components/AddedBooksProvider/added-books-provider';

function MyApp({ Component, pageProps }) {
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
