import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "swiper/css";
import "swiper/css/navigation";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5279/api/review')
        .then(res => res.json())
        .then(data => setReviews(data))

    },[]);
    console.log('reviews',reviews);
  return (
    <section className="my-20">
      <SectionTitle
        subHeading={"What our client say"}
        heading={"Testimonials"}
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
        {
            reviews.map(review => <SwiperSlide
                key={review.id}
            >
                <div className="flex flex-col items-center mx-24 my-16">
                    <Rating
                    style={{maxWidth: 180}}
                    value={review.rating}
                    readOnly
                    ></Rating>
                    <p>{review.details}</p>
                    <h3 className="text-2xl text-orange-400">{review.name}</h3>
                </div>
            </SwiperSlide>)
        }
      </Swiper>
    </section>
  );
};

export default Testimonials;
