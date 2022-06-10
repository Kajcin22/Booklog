import BookCard from '../../components/BookCard/book-card';
import styles from './LandingPage.module.css';
import Hero from '../../components/HeroSection';
import Login from '../../components/Login/login';
import LoginModal from '../../components/Login/login-modal';
import { useAddedBooks } from '../../components/AddedBooksProvider/added-books-provider';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useAuth } from '../../components/AuthProvider/auth-provider';
import { Swiper, SwiperSlide } from 'swiper/react';
import BookPreview from '../../components/BookPreview/book-preview';
import { getBookPopularBooks, getBookNewestBooks } from '../../lib/api';

export default function LandingPage() {
  const [opened, setOpened] = useState(false);
  const [popularBooks, setPopularBooks] = useState([]);
  const [newestBooks, setNewestBooks] = useState([]);

  const { bookResponse, getBooks } = useAddedBooks();
  console.log(bookResponse, 'bookResponse');

  const { session } = useAuth();

  useEffect(() => {
    getBookNewestBooks()?.then((response) => {
      setNewestBooks(response);
    });
  }, []);

  useEffect(() => {
    getBookPopularBooks()?.then((response) => {
      setPopularBooks(response);
    });
  }, []);

  return (
    <>
      <div className="container">
        <Hero />
        <div className={styles.book_section}>
          <div className={styles.book_section_heading}>
            <h3>Populární knihy</h3>
          </div>
          <div className={styles.book_section_cards}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              onSwiper={(swiper) => (window.swiper = swiper)}
              setWrapperSize
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 50,
                },
                1000: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 50,
                },
                1400: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                  spaceBetween: 50,
                },
              }}
              navigation
              loop
              scrollbar={{ draggable: true }}
              pagination={{ clickable: true }}
            >
              {popularBooks?.map((book) => (
                <SwiperSlide key={book?.id}>
                  <BookPreview book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={styles.book_section}>
          <div className={styles.book_section_heading}>
            <h3>Naposledy čteno</h3>
          </div>
          <div className={styles.book_section_cards}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              onSwiper={(swiper) => (window.swiper = swiper)}
              setWrapperSize
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 50,
                },
                1000: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 50,
                },
                1400: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                  spaceBetween: 50,
                },
              }}
              navigation
              loop
              scrollbar={{ draggable: true }}
              pagination={{ clickable: true }}
            >
              {newestBooks?.map((book) => (
                <SwiperSlide key={book?.id}>
                  <BookPreview book={book} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={styles.registrace}>
          <div className={styles.registrace__main}>
            <h1>Zaregistruj se nyní a měj svou četbu pod kontrolou!</h1>
          </div>
          <div className={styles.registrace__form}>
            <Login />
          </div>
        </div>
        <LoginModal />
      </div>
    </>
  );
}
