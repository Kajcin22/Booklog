import { Modal, TextInput, Group, Button } from '@mantine/core';
import { useState } from 'react';
import Login from './login';

const LoginModal = ({ opened, setOpened }) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Přihlášení do Booklogu"
      >
        <Login />
      </Modal>
    </>
  );
};

export default LoginModal;
