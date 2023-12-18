import React,{useEffect} from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@material-ui/core';

const otherServices = [
    {
      title: 'Live Classes (Online)',
      description: 'Interactive live classes conducted online with expert educators.',
    },
    {
      title: 'On-Demand Courses',
      description: 'Access to a wide range of on-demand courses on various subjects.',
    },
    {
      title: 'Personalized Learning',
      description: 'Tailored learning plans to meet each student\'s unique needs.',
    },
    {
      title: 'Virtual Labs',
      description: 'Hands-on experience through virtual lab simulations.',
    },
    {
      title: 'Study Resources',
      description: 'Comprehensive study materials including notes and videos.',
    },
    {
      title: 'Discussion Forums',
      description: 'Engage in discussions with peers and instructors.',
    },
    {
      title: 'Online Assessments',
      description: 'Regular online quizzes and assessments to track progress.',
    },
    {
      title: 'Career Guidance',
      description: 'Guidance and support for career planning and development.',
    },
    {
      title: 'Language Courses',
      description: 'Learn new languages from qualified language instructors.',
    },
    {
      title: 'Art & Creativity',
      description: 'Explore your creative side with art and craft classes.',
    },
    {
      title: 'Coding Workshops',
      description: 'Hands-on coding workshops for aspiring programmers.',
    },
    {
      title: 'Health & Fitness',
      description: 'Stay fit with online fitness and wellness classes.',
    },
    {
      title: 'Music Lessons',
      description: 'Learn to play musical instruments from skilled musicians.',
    },
    {
      title: 'Science Explorations',
      description: 'Discover the wonders of science through interactive sessions.',
    },
    {
      title: 'Math Mastery',
      description: 'Improve math skills with dedicated math tutoring.',
    },
    {
      title: 'History & Culture',
      description: 'Journey through history and explore diverse cultures.',
    },
    {
      title: 'Mock Exams',
      description: 'Practice for exams with realistic mock test environments.',
    },
    {
      title: 'Literary Corner',
      description: 'Explore literature and improve your language skills.',
    },
    {
      title: 'Financial Literacy',
      description: 'Learn about personal finance and economic concepts.',
    },
    {
      title: 'STEM Education',
      description: 'Engage in STEM activities and experiments.',
    },
    {
      title: 'Philosophy Classes',
      description: 'Engage in philosophical discussions and explore profound ideas.',
    },
  ];
  

  

const OtherService = () => {

  useEffect(() => {
    // Function to scroll to the top of the page
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Use 'smooth' for a smooth scrolling effect
      });
    };

    // Scroll to the top when the component mounts
    scrollToTop();
  }, []);

  return (
    <Container  style={{overflowY:"hidden", marginBottom:"20px"}}  maxWidth="lg">
      <Typography style={{color:"black", background:"skyblue", borderRadius:"30px", overflowY:"hidden", marginTop:"130px"}} variant="h3" align="center" gutterBottom>
        Other Services at Ogendu Academy
      </Typography>
      <Grid container spacing={3}>
        {otherServices.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography style={{color:"black", background:"skyblue", borderRadius:"2px 2px 100px 100px ", textAlign:"center" }} variant="h5" gutterBottom>
                  {service.title}
                </Typography>
                <Typography style={{fontWeight:"bold", fontSize:"18px", fontFamily:"monospace"}}>{service.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OtherService;
