import { Modal } from '@mantine/core';
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
