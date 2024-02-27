'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { data } from '@/data/swiperData';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import { Controller } from 'swiper/modules';
import 'swiper/scss';

export default function Home() {
  const [swiperControll, setSwiperControll] = useState(null);
  const [swiperControllSecond, setSwiperControllSecond] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.nav}>
          <button onClick={() => swiperControll.slidePrev()}>{'<'}</button>
          <button onClick={() => swiperControll.slideNext()}>{'>'}</button>
        </div>

        <Swiper
          slidesPerView={1}
          onSwiper={(swiper) => setSwiperControll(swiper)}
          onSlideChange={() => setActiveIndex(swiperControll.activeIndex)}
          modules={[Controller]}
          controller={{ control: swiperControllSecond }}
        >
          {data.map((d, i) => (
            <SwiperSlide key={i}>
              <h1>{d.title}</h1>
              <p className={styles.desc}>{d.desc}</p>
              <Link href={'#'}>Read More</Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <p className={styles.pagination}>{`${activeIndex + 1} / ${
          data.length
        }`}</p>
      </div>
      <div className={styles.right}>
        <Swiper
          modules={[Controller]}
          controller={{ control: swiperControll }}
          onSwiper={setSwiperControllSecond}
        >
          {data.map((data, i) => (
            <SwiperSlide key={i} style={{ height: '100%', width: '100%' }}>
              <div className={styles.imgContainer}>
                <Image src={data.img} alt='' fill priority />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
