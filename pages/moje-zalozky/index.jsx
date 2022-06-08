import Bookmark from '../../components/Bookmark/bookmark';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase_client';
import { useAuth } from '../../components/AuthProvider/auth-provider';
import dayjs from 'dayjs';
import styles from './Zalozky.module.css';

export default function Home() {
  const [response, setResponse] = useState(null);
  const { userId } = useAuth();

  const getBookmarks = async () => {
    const result = await supabase
      .from('Bookmark')
      .select()
      .eq('userId', userId);
    setResponse(result?.data);
  };
  useEffect(() => {
    if (userId) {
      getBookmarks();
    }
  }, [userId]);

  return (
    <>
      <div className={styles.bookmarkSection}>
        {response &&
          response.length > 0 &&
          response.map((bookmark) => {
            return (
              <div key={bookmark.id}>
                <Bookmark
                  bookId={bookmark.bookId}
                  pageNum={bookmark.pageNum}
                  dateCreated={dayjs(bookmark.created_at).format(
                    'DD. MM. YYYY',
                  )}
                  bookTitle={bookmark.title}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
