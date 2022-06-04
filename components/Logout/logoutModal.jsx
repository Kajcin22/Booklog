import { Modal, TextInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import Logout from './logout';

const LogoutModal = ({ opened, setOpened }) => {
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Odhlášení">
        <Logout />
      </Modal>
    </>
  );
};

export default LogoutModal;
