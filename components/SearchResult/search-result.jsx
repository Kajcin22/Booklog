import styles from './SearchResult.module.css';
import Image from 'next/image';
import { supabase } from '../../lib/supabase_client';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthProvider/auth-provider';

const SearchResult = ({
  imgUrl,
  author,
  title,
  description,
  setOpened,
  bookId,
  pageNumber,
}) => {
  const router = useRouter();
  const { session } = useAuth();

  const onAddBook = async () => {
    try {
      const { data: bookFound, error } = await supabase
        .from('Book')
        .select()
        .eq('bookId', bookId);
      if (bookFound.length === 0) {
        const { data, error } = await supabase?.from('Book')?.insert([
          {
            title,
            author,
            description,
            imgUrl,
            state: 'unread',
            bookId,
            pageNumber,
          },
        ]);
      }
      await supabase
        .from('Library')
        .insert([{ userId: session?.user?.id, bookId }]);
      if (!error) {
        setOpened(false);
        router.push(`/moje-knihy?q=${title}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.bookcard}>
      <div className={styles.bookCover}>
        <Image
          width={150}
          height={200}
          fit="contain"
          className={styles.bookCover}
          src={imgUrl || '/bookcover-icon.png'}
          alt="bookcover"
        />
      </div>

      <p className={styles.booktitle}>{title}</p>

      <p className={styles.bookauthor}>{author}</p>

      <button onClick={onAddBook} className={styles.createbutton}>
        Přidat do mých knih
      </button>
    </div>
  );
};

export default SearchResult;
