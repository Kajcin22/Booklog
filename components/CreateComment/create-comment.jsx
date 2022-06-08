import { Modal, TextInput, Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useState } from 'react';
import { supabase } from '../../lib/supabase_client';

import { useRouter } from 'next/router';
import styles from './CreateComment.module.css';

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
        <form
          onSubmit={form.onSubmit(handleComment)}
          className={styles.commentForm}
        >
          <TextInput
            label="Název:"
            type="text"
            placeholder="název komentáře"
            required
            {...form.getInputProps('commentName')}
          />
          <TextInput
            label="Stránka:"
            type="number"
            placeholder="zadej číslo stránky"
            required
            {...form.getInputProps('commentPage')}
          />
          <Textarea
            label="Komentář:"
            placeholder="zde napiš svůj komentář"
            required
            {...form.getInputProps('commentInput')}
          />

          <div className={styles.buttonWrapper}>
            <Button type="submit">Přidat</Button>
          </div>
        </form>
        {/* {response &&
          response.map((item) => (
           
          ))} */}
      </Modal>
    </>
  );
};

export default CreateComment;
