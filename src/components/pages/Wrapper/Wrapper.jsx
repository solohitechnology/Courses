import axios from 'axios';
import { useEffect, useState } from 'react';
import './awrapper.css';

const Awrapper = () => {
  const [instructors, setInstructors] = useState(1);

  useEffect(() => {
    getTestimonies();
  }, []);

  async function getTestimonies() {
    try {
      const response = await axios.get('/api/testimo/testimonials');
      console.log(response.data.length);
      setInstructors(response.data.length);
    } catch (error) {
      console.error(error);
    }
  }

  const awrapper = [
    {
      cover:
        't4.png',
      data: instructors,
      title: 'SUCCESS STORIES',
    },
    {
      cover: 't1.png',
      data: '80',
      title: 'TRUSTED TUTORS',
    },
    {
      cover:
        't2.png',
      data: '6',
      title: 'WORKSHOP WEBINAR  ',
    },
    {
      cover: 't3.png',
      data: '220',
      title: 'ONLINE COURSES',
    },
  ];

  return (
    <>
      <section className='awrapper'>
        <div className='container grid' style={{display:'flex', flexWrap:"wrap"}}>
          {awrapper.map((val, index) => (
            <div key={index} className='box flex list'>
              <div className='about_text'>
                <img src={val.cover} alt="" />
                <h1 className='display-4'>{val.data}+ </h1>
                <h3 className='h4'>{val.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Awrapper;
