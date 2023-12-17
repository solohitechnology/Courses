import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Testimonial data including text and image URLs
const staticTestimonials = [
  {
    id: 1,
    picture: 'w.jpeg',
    testimonial: 'Ogendu Academy has an exceptional library that has truly enriched my learning experience. The vast collection of resources, both online and offline, provides in-depth insights into various subjects. The comfortable and inviting space of the library makes it the perfect place for focused study and research.',
    name: 'John samuel',
    country: 'USA',
  },
  {
    id: 2,
    picture: 'solomon.jpeg',
    testimonial: "The library at Ogendu Academy is a treasure trove for knowledge seekers. I've discovered a plethora of academic journals, reference materials, and engaging books that have expanded my understanding of my chosen field. The accessibility and organization of resources in the library have made my research endeavors incredibly fruitful.",
    name: 'Jane Doe',
    country: 'UK',
  },
  {
    id: 3,
    picture: 'solomon.jpeg',
    testimonial: "As a student at Ogendu Academy, I can confidently say that the library is a standout feature. The variety of books and digital resources available cater to diverse interests and subjects. The library's conducive environment fosters a culture of curiosity and continuous learning.",
    name: 'Emma Smith',
    country: 'Canada',
  },
  {
    id: 4,
    picture: 'w.jpeg',
    testimonial: "The library facilities at Ogendu Academy are exceptional. Whether it's finding scholarly articles, accessing e-books, or engaging in collaborative study sessions, the library offers a dynamic learning space. It has become an integral part of my academic journey, contributing significantly to my success.",
    name: 'Benjamin',
    country: 'Nigeria',
  },
  {
    id: 5,
    picture: 'uk.jpeg',
    testimonial: "I can't praise Ogendu Academy's library enough. It's more than a repository of books; it's a hub of knowledge and exploration. The friendly and knowledgeable library staff have been instrumental in guiding me to valuable resources, making my learning adventure at Ogendu Academy truly enriching.",
    name: 'Maria Garcia',
    country: 'Spain',
  },
];

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Use static data instead of fetching from an API
    setTestimonials(staticTestimonials);
  }, []);

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (window.innerWidth < 768) {
    settings.slidesToShow = 1; // Show only one card on mobile
  } else {
    settings.slidesToShow = 1; // Show two cards on larger screens
  }

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-scroll every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container testimonials-p">
      <div className="row">
        <div className="col-lg-12">
          <div className="testimonials-h">
            <h1>Testimonials</h1>
            <h3>See what our supporters and beneficiaries are saying about our work.</h3>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.slice(-3).map((testimonial) => (
              <div key={testimonial.id} className="testimonial-c">
                <img
                  src={testimonial.picture}
                  alt="Testimonial"
                  className="testimonial-image img-fluid rounded-circle"
                />
                <p>{testimonial.testimonial}</p>
                <p className="testimonial-a">{testimonial.name}</p>
                <p className="testimonial-p">{testimonial.country}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
