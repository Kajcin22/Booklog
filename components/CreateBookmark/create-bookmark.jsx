import { Modal, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useState } from 'react';

const CreateBookmark = ({ opened, setOpenedBookmark }) => {
  const form = useForm({
    initialValues: {
      pageNumber: '',
      commentDate: '',
    },
  });

  const handleBookmark = (formValues) => {
    return console.log(formValues);
  };
  const [response, setResponse] = useState('');

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpenedBookmark(false)}
        title="Vytvoř záložku"
      >
        <form onSubmit={form.onSubmit(handleBookmark)}>
          <TextInput
            label="Stránka"
            type="number"
            placeholder="číslo stránky"
            {...form.getInputProps('pageNumber')}
          />
          <TextInput
            label="Datum:"
            type="date"
            placeholder="zadejte datum"
            {...form.getInputProps('commentDate')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Přidat</Button>
          </Group>
        </form>
        {/* {response &&
          response.map((item) => (
           
          ))} */}
      </Modal>
    </>
  );
};

export default CreateBookmark;
