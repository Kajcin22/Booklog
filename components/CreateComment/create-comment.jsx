import { Modal, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useState } from 'react';
import { supabase } from '../../lib/supabase_client';

import { useRouter } from 'next/router';

const CreateComment = ({ opened, setOpened, bookId, userId }) => {
  const form = useForm({
    initialValues: {
      commentName: '',
      commentInput: '',
      commentPage: '',
    },
  });

  const router = useRouter();

  const handleComment = async (formValues) => {
    const { data, error } = await supabase.from('Comment').insert([
      {
        userId,
        bookId,
        title: formValues.commentName,
        content: formValues.commentInput,
        pageNum: formValues.commentPage,
      },
    ]);

    if (data) {
      setOpened(false);
      router.reload();
    }
  };

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
            required
            type="text"
            placeholder="název komentáře"
            {...form.getInputProps('commentName')}
          />

          <TextInput
            label="Komentář:"
            type="text"
            required
            placeholder="zde napište váš komentář"
            {...form.getInputProps('commentInput')}
          />
          <TextInput
            label="Stránka:"
            type="number"
            required
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
