import styles from './Bookmark.module.css';
import Link from 'next/link';

import { supabase } from '../../lib/supabase_client';
import { useRouter } from 'next/router';

const Bookmark = ({ pageNum, dateCreated, bookTitle, bookId }) => {
  const router = useRouter();

  const onDeleteBookmark = async () => {
    await supabase?.from('Bookmark')?.delete()?.eq('title', bookTitle);

    router.reload('/moje-zalozky');
  };

  return (
    <>
      <div className={styles.bookmark}>
        <button onClick={onDeleteBookmark} className={styles.delete_btn}>
          x
        </button>
        <div className={styles.bookmark_title}>
          <Link href={`/moje-knihy/${bookId}`}>
            <h2>{bookTitle}</h2>
          </Link>

          <p>vytvořeno: {dateCreated}</p>
        </div>
        <div className={styles.bookmark_page}>
          <p>
            <span className={styles.bookmark_pagenumb}>{pageNum}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
