import { Box, Group } from '@mantine/core';
import Link from 'next/link';
import Footer from '../Footer/footer';
import TopHeader from '../Header/header';

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
