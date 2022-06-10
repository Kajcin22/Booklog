import { Modal, TextInput, Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
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
    const { data, error } = await supabase?.from('Comment')?.insert([
      {
        userId,
        bookId,
        title: formValues?.commentName,
        content: formValues?.commentInput,
        pageNum: formValues?.commentPage,
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
        title="Přidej poznámku"
      >
        <form
          onSubmit={form?.onSubmit(handleComment)}
          className={styles.commentForm}
        >
          <TextInput
            label="Název:"
            required
            type="text"
            placeholder="název poznámky"
            rightSection={
              <div onClick={() => form?.setFieldValue('commentName', '')}>
                X
              </div>
            }
            {...form?.getInputProps('commentName')}
          />
          <TextInput
            label="Stránka:"
            type="number"
            placeholder="zadej číslo stránky"
            required
            rightSection={
              <div onClick={() => form?.setFieldValue('commentPage', '')}>
                X
              </div>
            }
            {...form?.getInputProps('commentPage')}
          />
          <Textarea
            className={styles.commentContent}
            label="Poznámka:"
            placeholder="zde napiš svoji poznámku"
            required
            rightSection={
              <div onClick={() => form?.setFieldValue('commentInput', '')}>
                X
              </div>
            }
            {...form?.getInputProps('commentInput')}
          />

          <div className={styles.buttonWrapper}>
            <Button type="submit">Přidat</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateComment;
