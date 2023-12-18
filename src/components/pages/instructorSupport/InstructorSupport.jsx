import React,{useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { Container, Typography, Grid, Card, CardContent } from '@material-ui/core';

const instructorSupportServices = [
  {
    title: 'Teaching Resources',
    description: 'Access teaching materials, lesson plans, and resources.',
  },
  {
    title: 'Professional Development',
    description: 'Participate in workshops and training to enhance teaching skills.',
  },
  {
    title: 'Technical Assistance',
    description: 'Get help with technical issues related to teaching platforms.',
  },
  {
    title: 'Student Feedback',
    description: 'Receive feedback from students to improve teaching methods.',
  },
  {
    title: 'Collaboration Spaces',
    description: 'Join forums and groups to collaborate with fellow instructors.',
  },
];

const InstructorSupport = () => {
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

    <>

    
   <Helmet>
      <title> Ogendu Academy Instructor Support</title>
    </Helmet>
    
    <Container style={{overflowY:"hidden", marginBottom:"20px"}} maxWidth="lg">
      <Typography style={{color:"black", background:"skyblue", borderRadius:"30px", overflowY:"hidden", marginTop:"130px"}} variant="h3" align="center" gutterBottom>
        Instructor Support Services
      </Typography>
      <Grid container spacing={3}>
        {instructorSupportServices.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography style={{color:"black", background:" skyblue ", borderRadius:"2px 2px 100px 100px ", textAlign:"center" }} variant="h5" gutterBottom>
                  {service.title}
                </Typography>
                <Typography  style={{fontWeight:"bold", fontSize:"18px", fontFamily:"serif"}} >{service.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
};

export default InstructorSupport;













   





