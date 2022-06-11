import { Modal } from '@mantine/core';
import Login from '../Login/login';

const LinkModal = ({ opened, setOpened }) => {
  return (
    <>
      <Modal
        centered
        opened={opened}
        overflow="auto"
        size="50%"
        onClose={() => setOpened(false)}
        title="Dostupné jen přihlášeným uživatelům."
      >
        <Login />
      </Modal>
    </>
  );
};

export default LinkModal;
