import { Collapse, Button } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase_client';

import styles from './Comment.module.css';

const Comment = ({ title, dateCreated, content, page, id }) => {
  const [opened, setOpen] = useState(false);
  const router = useRouter();

  const onDeleteComment = async () => {
    await supabase.from('Comment').delete().eq('id', id);

    router.reload();
  };

  return (
    <>
      <div className={styles.comment}>
        <button
          className={styles.comment__btn}
          onClick={() => setOpen((o) => !o)}
        >
          <div className={styles.comment__title}>{title}</div>
          <div className={styles.comment__page}>strana: {page}</div>
          <button onClick={onDeleteComment} className={styles.delete_btn}>
            x
          </button>
        </button>

        <Collapse in={opened}>
          <h3>vytvořeno: {dateCreated}</h3>
          <div className={styles.comment_content}>{content}</div>
        </Collapse>
      </div>
    </>
  );
};

export default Comment;
