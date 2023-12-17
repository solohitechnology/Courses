import React from "react";
import { courses, sugestedCourses } from "./Data";
import Course from "../../course/Course";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import ItemsCarousel from "react-items-carousel";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Container = styled.div`
  margin-top: 6.4rem;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
`;
const CoursesList = styled.div`
  margin-top: 4.8rem;
  :hover {
    cursor: pointer;
  }
`;

const StudentsViewingTitle = styled.h2`
  margin-bottom: 1.6rem;
  max-width: 80rem;
  font-weight: 700;
  font-size: 1.7rem;
  letter-spacing: -0.02rem;
  line-height: 1.2;
  font-family: sans-serif;
`;

const CourseWrapper = styled.div`
  position: relative;
`;

const Arrow = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  background-color: black;
  border: 1px solid #6a6f73;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15%;
  right: ${(props) => props.direction === "right" && "-1.6rem"};
  left: ${(props) => props.direction === "left" && "-1.6rem"};
  margin: auto;
  cursor: pointer;
  z-index: 2;
  :hover {
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  }
`;

const CopyStudentsViewingContainer = () => {
    const [activeItemIndex1, setActiveItemIndex1] = useState(0);
    const [activeItemIndex2, setActiveItemIndex2] = useState(0);

    const chevronWidth = 50;
  
    // Determine the number of cards based on the screen width
    const getNumberOfCards = () => {
      if (window.innerWidth < 600) {
        return 1; // Show 2 cards on smaller screens
      } else {
        return 4; // Show 5 cards on larger screens
      }
    };

    const [numberOfCards, setNumberOfCards] = useState(getNumberOfCards);

    // Update the number of cards on window resize
    useEffect(() => {
      const handleResize = () => {
        setNumberOfCards(getNumberOfCards());
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  

    return (
        <Container>
            <CoursesList>
                <StudentsViewingTitle>Trending courses</StudentsViewingTitle>

                <CourseWrapper>
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex1}
                        activeItemIndex={activeItemIndex1}
                        numberOfCards={numberOfCards}
                        gutter={15}
                        leftChevron={<Arrow direction="left"><ChevronLeftIcon style={{ color: "white", fontSize: "2rem" }} /></Arrow>}
                        rightChevron={<Arrow direction="right"><ChevronRightIcon style={{ color: "white", fontSize: "2rem" }} /></Arrow>}
                        outsideChevron={false}
                        chevronWidth={chevronWidth}
                    >
                        {courses.map((item) => (
                            <Course item={item} key={item.id} />
                        ))}
                    </ItemsCarousel>
                </CourseWrapper>
            </CoursesList>

            {/* <CoursesList>
                <StudentsViewingTitle>
                    Because you searched for{" "}
                    <span style={{ color: "purple" }}>"zero to master"</span>{" "}
                </StudentsViewingTitle>

                <CourseWrapper>
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex2}
                        activeItemIndex={activeItemIndex2}
                        numberOfCards={5}
                        gutter={15}
                        leftChevron={<Arrow direction="left"><ChevronLeftIcon style={{ color: "white", fontSize: "2rem" }} /></Arrow>}
                        rightChevron={<Arrow direction="right"><ChevronRightIcon style={{ color: "white", fontSize: "2rem" }} /></Arrow>}
                        outsideChevron={false}
                        chevronWidth={chevronWidth}
                    >
                        {sugestedCourses.map((item) => (
                            <Course item={item} key={item.id} />
                        ))}
                    </ItemsCarousel>
                </CourseWrapper>
            </CoursesList> */}
        </Container>
    );
};

export default CopyStudentsViewingContainer;
