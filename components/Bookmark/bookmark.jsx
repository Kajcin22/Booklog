import { Collapse, Button } from '@mantine/core';
import { useState } from 'react';
import styles from './Bookmark.module.css';

const Bookmark = ({ pageNum, dateCreated, bookTitle }) => {
  return (
    <>
      <div className={styles.bookmark}>
        <div className={styles.bookmark_title}>
          <h2>{bookTitle}</h2>
          <p>vytvořeno: {dateCreated}</p>
        </div>
        <div className={styles.bookmark_page}>
          <p className={styles.pin}></p>
          <p>
            <span className={styles.bookmark_pagenumb}>{pageNum}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
