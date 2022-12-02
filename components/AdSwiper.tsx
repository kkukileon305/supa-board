'use client';

import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import 'swiper/swiper-bundle.css';

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
      <div className='mx-auto max-w-[1060px] p-3 relative'>
        <Swiper //
          spaceBetween={30}
          direction='horizontal'
          autoplay={{
            delay: 10000,
          }}
          modules={[Autoplay]}
          loop
        >
          {ads.map(ad => (
            <SwiperSlide key={ad.id}>
              <div className='w-full h-[300px] bg-blue-300 rounded-xl select-none flex justify-center items-center'>
                <h4 className='font-bold text-3xl text-white'>{ad.content}</h4>
              </div>
            </SwiperSlide>
          ))}
          <NextButton />
          <PrevButton />
        </Swiper>
      </div>
    </div>
  );
};

const NextButton = () => {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slideNext()} className='absolute right-4 top-[calc(50%-15px)] p-2 bg-white/50 aspect-square rounded-full z-10'>
      <AiOutlineRight color='#00000050' size={30} />
    </button>
  );
};

const PrevButton = () => {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slidePrev()} className='absolute left-4 top-[calc(50%-15px)] p-2 bg-white/50 aspect-square rounded-full z-10'>
      <AiOutlineLeft color='#00000050' size={30} />
    </button>
  );
};

export default AdSwiper;
