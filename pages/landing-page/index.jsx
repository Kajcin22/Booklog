import BookCard from '../../components/BookCard/book-card';
import styles from './LandingPage.module.css';
import Hero from '../../components/HeroSection';
import Login from '../../components/Login/login';
import LoginModal from '../../components/Login/login-modal';
import { useAddedBooks } from '../../components/AddedBooksProvider/added-books-provider';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import Slider from 'react-slick';

export default function Home() {
  const [opened, setOpened] = useState(false);

  const { bookResponse, getBooks } = useAddedBooks();
  console.log(bookResponse, 'bookResponse');
  useEffect(() => {
    getBooks(4);
  }, []);

  const settingsSlick = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="container">
        <Hero />
        <div className={styles.book_section}>
          <div className={styles.book_section_heading}>
            <h3>Populární knihy</h3>
            <button>procházet</button>
          </div>
          <div className={styles.book_section_cards}>
            {/* <BookCard />
            <BookCard />
            <BookCard />
            <BookCard /> */}
          </div>
        </div>
        <div className={styles.book_section}>
          <div className={styles.book_section_heading}>
            <h3>Naposledy čteno</h3>
            <button>procházet</button>
          </div>
          <div className={styles.book_section_cards}>
            <Slider {...settingsSlick}>
              {bookResponse?.map((book) => (
                <BookCard book={book} />
              ))}
            </Slider>
          </div>
        </div>
        <div className={styles.registrace}>
          <h1>Zaregistruj se nyní a měj svou četbu pod kontrolou!</h1>

          <Login />
        </div>
        <LoginModal />
      </div>
    </>
  );
}
