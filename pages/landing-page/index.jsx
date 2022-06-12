import styles from './LandingPage.module.css';
import Link from 'next/link';
import Hero from '../../components/HeroSection';
import Login from '../../components/Login/login';
import { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import BookPreview from '../../components/BookPreview/book-preview';
import { getBookPopularBooks, getBookNewestBooks } from '../../lib/api';
import Loader from '../../components/Loader/loader';
import { useAuth } from '../../components/AuthProvider/auth-provider';

export default function LandingPage() {
  const [popularBooks, setPopularBooks] = useState(null);
  const [newestBooks, setNewestBooks] = useState(null);
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
            {popularBooks?.status === 200 ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                onSwiper={(swiper) => (window.swiper = swiper)}
                setWrapperSize
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 25,
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
                {popularBooks?.popularBooks?.map((book) => (
                  <SwiperSlide key={book?.id}>
                    <BookPreview book={book} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={styles.loaderWrapper}>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className={styles.book_section}>
          <div className={styles.book_section_heading}>
            <h3>Ostatní právě čtou</h3>
          </div>
          <div className={styles.book_section_cards}>
            {newestBooks?.status === 200 ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                onSwiper={(swiper) => (window.swiper = swiper)}
                setWrapperSize
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 25,
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
                {newestBooks?.data?.map((book) => (
                  <SwiperSlide key={book?.id}>
                    <BookPreview book={book} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={styles.loaderWrapper}>
                <Loader />
              </div>
            )}
          </div>
        </div>

        {!session?.user?.email ? (
          <div className={styles.registrace}>
            <div className={styles.registrace__main}>
              <h1>Zaregistruj se nyní a měj svou četbu pod kontrolou!</h1>
            </div>
            <div className={styles.registrace__form}>
              <Login />
            </div>
          </div>
        ) : (
          <div className={styles.registrace}>
            <div className={styles.registrace__main}>
              <h1>Nezapomeň také omrknout svoji statistiku.</h1>
              <Link href="/statistika">
                <p className={styles.header__btn}>Jdu na to!</p>
              </Link>
              <br />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
