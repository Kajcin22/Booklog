import { Modal, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useState } from 'react';

const CreateComment = ({ opened, setOpened }) => {
  const form = useForm({
    initialValues: {
      commentName: '',
      commentDate: '',
      commentInput: '',
      commentPage: '',
    },
  });

  const handleComment = (formValues) => {
    return console.log(formValues);
  };
  const [response, setResponse] = useState('');

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Přidej komentář"
      >
        <form onSubmit={form.onSubmit(handleComment)}>
          <TextInput
            label="Název:"
            type="text"
            placeholder="název komentáře"
            {...form.getInputProps('commentName')}
          />
          <TextInput
            label="Datum:"
            type="date"
            placeholder="zadejte datum"
            {...form.getInputProps('commentDate')}
          />
          <TextInput
            label="Komentář:"
            type="text"
            placeholder="zde napište váš komentář"
            {...form.getInputProps('commentInput')}
          />
          <TextInput
            label="Stránka:"
            type="number"
            placeholder="zadejte číslo stránky"
            {...form.getInputProps('commentPage')}
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

export default CreateComment;
