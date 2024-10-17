// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section>

        <SectionTitle
        heading={"ORDER ONLINE"}
        subHeading={"From 11am to 10pm"}
        >

        </SectionTitle>

        <Swiper
      slidesPerView={4}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper mb-10"
    >
      <SwiperSlide>
        <div className="text-3xl uppercase text-center -mt-10 text-white">
          <img src={slide1} alt="" />
          <h3 className="-mt-10">Salads</h3>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="text-3xl uppercase text-center -mt-10 text-white">
          <img src={slide2} alt="" />
          <h3 className="-mt-10">Pizzas</h3>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="text-3xl uppercase text-center -mt-10 text-white">
          <img src={slide3} alt="" />
          <h3 className="-mt-10">Soups</h3>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="text-3xl uppercase text-center -mt-10 text-white">
          <img src={slide4} alt="" />
          <h3 className="-mt-10">Desserts</h3>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="text-3xl uppercase text-center -mt-10 text-white">
          <img src={slide5} alt="" />
          <h3 className="-mt-10">Salads</h3>
        </div>
      </SwiperSlide>
    </Swiper>
    </section>
  );
};

export default Category;
