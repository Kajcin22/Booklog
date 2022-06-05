import BookCard from '../../components/BookCard/book-card';
import styles from './LandingPage.module.css';
import Hero from '../../components/HeroSection';
import Login from '../../components/Login/login';
import LoginModal from '../../components/Login/login-modal';
import { useAddedBooks } from '../../components/AddedBooksProvider/added-books-provider';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// import Head from 'next/head';

export default function Home() {
  const [opened, setOpened] = useState(false);

  const { bookResponse, getBooks } = useAddedBooks();
  console.log(bookResponse, 'bookResponse');
  useEffect(() => {
    getBooks(4);
  }, []);

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
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              onSwiper={(swiper) => (window.swiper = swiper)}
              slidesPerView={3}
              spaceBetween={100}
              slidesPerGroup={2}
              navigation
              loop
              scrollbar={{ draggable: true }}
              pagination={{ clickable: true }}
            >
              {bookResponse?.map((book) => (
                <SwiperSlide key={book.id}>
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
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
