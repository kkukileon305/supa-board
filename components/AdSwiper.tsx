'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const ads = [
  {
    id: 1,
    content: '광고1',
  },
  {
    id: 2,
    content: '광고2',
  },
  {
    id: 3,
    content: '광고3',
  },
  {
    id: 4,
    content: '광고4',
  },
];

const AdSwiper = () => {
  return (
    <div className='overflow-x-hidden'>
      <div className='mx-auto max-w-[1060px] p-3'>
        <Swiper //
          spaceBetween={30}
          direction='horizontal'
          className='!overflow-visible'
        >
          {ads.map(ad => (
            <SwiperSlide key={ad.id}>
              <div className='w-full h-[300px] bg-blue-300 rounded-xl select-none flex justify-center items-center'>
                <h4 className='font-bold text-3xl text-white'>{ad.content}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default AdSwiper;
