import { Box, Group } from '@mantine/core';
import Link from 'next/link';
import Footer from '../Footer';
import TopHeader from '../Header';

const Layout = ({ children }) => {
  return (
    <>
      <TopHeader />

      {children}
      <Footer />
    </>
  );
};

export default Layout;
