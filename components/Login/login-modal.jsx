import { Modal } from '@mantine/core';
import Login from './login';

const LoginModal = ({ opened, setOpened }) => {
  return (
    <>
      <Modal
        overflow="auto"
        size="50%"
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
