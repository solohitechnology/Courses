import React,{useEffect} from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@material-ui/core';
import { Helmet } from 'react-helmet';


const supportServices = [
  {
    title: 'Academic Assistance',
    description: 'Get help with your studies from expert tutors and educators.',
  },
  {
    title: 'Counseling Services',
    description: 'Access professional counseling for personal and academic support.',
  },
  {
    title: 'Technical Support',
    description: 'Assistance with technical issues related to online learning platforms.',
  },
  {
    title: 'Study Groups',
    description: 'Join study groups to collaborate with peers and enhance learning.',
  },
  {
    title: 'Feedback and Suggestions',
    description: 'Provide feedback and suggestions to improve our services.',
  },
];

const StudentSupport = () => {

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
        <title> Ogendu Academy Studend Support </title>
      </Helmet>


      <Container style={{ overflowY: "hidden", marginBottom:"20px" }} maxWidth="lg">
        <Typography style={{ color: "black", background: "skyblue", borderRadius: "30px", overflowY: "hidden", marginTop: "130px" }} variant="h3" align="center" gutterBottom>
          Student Support Services
        </Typography>
        <Grid container spacing={3}>
          {supportServices.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography style={{ color: "black", background: " skyblue", borderRadius: "2px 2px 100px 100px ", textAlign: "center" }} variant="h5" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography style={{ fontWeight: "bold", fontSize: "18px", fontFamily: "monospace" }} >{service.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default StudentSupport;




