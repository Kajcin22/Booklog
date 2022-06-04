import { Collapse, Button } from '@mantine/core';
import { useState } from 'react';
import styles from './Comment.module.css';

const Comment = ({ title, dateCreated, content, page }) => {
  const [opened, setOpen] = useState(false);
  return (
    <>
      <div className={styles.comment}>
        <Button
          onClick={() => setOpen((o) => !o)}
          className={styles.comment_btn}
        >
          <div className={styles.comment__btn}>
            <div className={styles.comment__title}>{title}</div>
            <div className={styles.comment__page}>strana: {page}</div>
          </div>
        </Button>

        <Collapse in={opened}>
          <h3>vytvořeno: {dateCreated}</h3>
          <div className={styles.comment_content}>{content}</div>
        </Collapse>
      </div>
    </>
  );
};

export default Comment;
