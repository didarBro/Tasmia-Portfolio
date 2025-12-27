"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      position: "CEO at TechCorp",
      feedback:
        "Sumon is an amazing developer! His skills and dedication to the project were unmatched. Highly recommend him.",
      image: "https://i.ibb.co/pKSbh60/pexels-spencer-selover-428328-1.jpg",
    },
    {
      name: "Jane Smith",
      position: "CTO at StartupHub",
      feedback:
        "Working with Sumon was a fantastic experience. He delivers high-quality work and is an excellent team player.",
      image: "https://i.ibb.co/yqtJd3T/pexels-reafon-gates-3221005.jpg",
    },
    {
      name: "Mike Johnson",
      position: "Project Manager at Innovatech",
      feedback:
        "Sumon's expertise in the MERN stack is impressive. He always delivers high-quality, clean, and efficient code.",
      image: "https://i.ibb.co/L8PGYxm/man-in-tailored-suit.jpg",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-14  text-white">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
        Testimonials
      </h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full max-w-4xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Image
                src={testimonial.image}
                alt={`${testimonial.name}'s picture`}
                height={50}
                width={50}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <p className="text-gray-300 mb-4">{testimonial.feedback}</p>
              <h4 className="text-lg font-bold text-green-400">
                {testimonial.name}
              </h4>
              <p className="text-gray-400">{testimonial.position}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
