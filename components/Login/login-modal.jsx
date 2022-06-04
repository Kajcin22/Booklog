import { Modal, TextInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import Login from './login';

const LoginModal = ({ opened, setOpened }) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Zadejte Váš email"
      >
        <Login />
      </Modal>
    </>
  );
};

export default LoginModal;
