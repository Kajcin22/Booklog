import { Box, Group } from '@mantine/core';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
      })}
    >
      <Box>
        <h1>Booklog</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit,
          nisi?
        </p>
      </Box>
      <Box>
        <h6>Navigace</h6>
        <ul style={{ listStyle: 'none' }}>
          <li>
            {' '}
            <Link href="/">
              <a>Domů</a>
            </Link>
          </li>
          <li>
            {' '}
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            {' '}
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            {' '}
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            {' '}
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default Footer;
