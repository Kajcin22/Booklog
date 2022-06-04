import { Collapse, Button } from '@mantine/core';
import { useState } from 'react';
import styles from './Bookmark.module.css';

const Bookmark = ({ pageNum, dateCreated, bookTitle }) => {
  return (
    <>
      <div className={styles.bookmark}>
        <div className={styles.bookmark_title}>
          <h2>{bookTitle}</h2>
          <p>
            stránka: <span>{pageNum}</span>
          </p>
        </div>

        <p>vytvořeno: {dateCreated}</p>
      </div>
    </>
  );
};

export default Bookmark;
