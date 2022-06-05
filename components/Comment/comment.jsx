import { Collapse, Button } from '@mantine/core';
import { useState } from 'react';
import styles from './Comment.module.css';

const Comment = ({ title, dateCreated, content, page }) => {
  const [opened, setOpen] = useState(false);
  return (
    <>
      <div className={styles.comment}>
        <button
          className={styles.comment__btn}
          onClick={() => setOpen((o) => !o)}
        >
          <div className={styles.comment__title}>{title}</div>
          <div className={styles.comment__page}>strana: {page}</div>
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
