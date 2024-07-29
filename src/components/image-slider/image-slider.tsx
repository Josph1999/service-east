import React, { useState } from 'react';
import type SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './styles.css';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import styles from './image-slider.module.css';

interface ImageSliderProps {
  files: File[];
}

export default function ImageSlider(props: ImageSliderProps): React.JSX.Element {
  const { files } = props;
  const [swiper, setSwiper] = useState<SwiperCore>();

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {files.length > 0 &&
          files.map((file, idx) => (
            <SwiperSlide key={idx} style={{ width: '100%' }}>
              {file.type.includes('image') ? (
                <img src={URL.createObjectURL(file)} alt={file.name} className={styles.postImage} />
              ) : (
                <video controls className={styles.postVideo}>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                  <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
                  <track src="captions_es.vtt" kind="captions" srcLang="es" label="spanish_captions" />
                </video>
              )}
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={(swiperita) => {
          setSwiper(swiperita);
        }}
        spaceBetween={50}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        id="swiper2"
      >
        {files.length > 0 &&
          files.map((file, idx) => (
            <SwiperSlide key={idx} style={{ width: '100%', cursor: 'pointer' }}>
              {file.type.includes('image') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ objectFit: 'cover', width: '150px', height: '150px', backgroundColor: 'gray' }}
                />
              ) : (
                <video controls style={{ objectFit: 'cover', width: '150px', height: '150px' }}>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                  <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
                  <track src="captions_es.vtt" kind="captions" srcLang="es" label="spanish_captions" />
                </video>
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
