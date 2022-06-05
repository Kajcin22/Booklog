import { Modal, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { supabase } from '../../lib/supabase_client';
import { useAuth } from '../AuthProvider/auth-provider';
import { useRouter } from 'next/router';

import { useState } from 'react';

const CreateBookmark = ({ opened, setOpenedBookmark, bookTitle, bookId }) => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      pageNumber: '',
    },
  });

  const { userId } = useAuth();

  const handleBookmark = async (formValues) => {
    const { data } = await supabase
      .from('Bookmark')
      .select()
      .eq('title', bookTitle)
      .maybeSingle();
    await supabase.from('Bookmark').upsert([
      {
        id: data?.id,
        pageNum: formValues.pageNumber,
        title: bookTitle,
        userId,
        bookId,
      },
    ]);
    setOpenedBookmark(false);
    router.reload();
  };

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
