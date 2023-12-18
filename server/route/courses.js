const { Router } = require("express");
// const Course = require("../models/Course");

const router = Router();

const predefinedCourses = [
  {
    id: 1,
    title: "React",
    description: "Learn React.js, a powerful JavaScript library for building user interfaces. This course covers the fundamentals, state management, component lifecycle, and more.",
    price: 200,
    author: "John Doe",
    authorAvater: "https://ecodesoft.com/wp-content/uploads/2022/10/react.jpg",
    vidLink: "../public/vid.mp4",
  },
  {
    id: 2,
    title: "Angular",
    description: "Explore Angular, a TypeScript-based open-source framework for building dynamic web applications. Dive into modules, components, services, and dependency injection.",
    price: 20,
    author: "Jane Smith",
    authorAvater: "https://miro.medium.com/v2/resize:fit:1400/1*qgo4_MwETtxdspEqt12sNA.png",
    vidLink: "../public/vid.mp4",
  },
  {
    id: 3,
    title: "Vue",
    description: "Master Vue.js, a progressive JavaScript framework for building user interfaces. Learn about Vue components, directives, and the Vue CLI for efficient development.",
    price: 209,
    author: "Samuel Williams",
    authorAvater: "https://cdn-media-1.freecodecamp.org/ghost/2019/03/vueart.png",
    vidLink: "../public/vid.mp4",
  },
  
  {
    id: 4,
    title: "Ethical Hacking",
    description: "Explore the world of ethical hacking and learn how to secure computer systems. Understand penetration testing, vulnerability assessment, and ethical hacking techniques.",
    price: 150,
    author: "Alice Johnson",
    authorAvater: "https://techbuild.africa/wp-content/uploads/2023/03/dreamstime_m_123641233-1.jpg",
    vidLink: "../public/vid.mp4",
  },
  {
    id: 5,
    title: "Cybersecurity Fundamentals",
    description: "Build a strong foundation in cybersecurity with this course. Learn about encryption, network security, threat detection, and cybersecurity best practices.",
    price: 180,
    author: "Bob Smith",
    authorAvater: "https://i.ytimg.com/vi/Y29_M_GS2DQ/sddefault.jpg",
    vidLink: "../public/vid.mp4",
  },
  {
    id: 6,
    title: "Robotics Programming",
    description: "Dive into the world of robotics programming. Understand robot control, motion planning, and programming languages commonly used in robotics development.",
    price: 250,
    author: "Charlie Brown",
    authorAvater: "https://amira.global/wp-content/uploads/2020/03/robotics-1312.1549051786.jpg",
    vidLink: "../public/vid.mp4",
  },
  {
    id: 7,
    title: "Machine Learning for Robotics",
    description: "Apply machine learning techniques to robotics. Explore how machine learning algorithms can enhance robot perception, decision-making, and control.",
    price: 300,
    author: "Diana Miller",
    authorAvater: "https://pbmainstream.com/wp-content/uploads/2022/10/robot-900x540.jpg",
    vidLink: "../public/vid.mp4",
  },
  {
    id: 8,
    title: "Autonomous Vehicles",
    description: "Learn about autonomous vehicles and the technologies behind self-driving cars. Explore sensor fusion, path planning, and real-world applications of autonomous systems.",
    price: 280,
    author: "Evan Davis",
    authorAvater: "https://c8.alamy.com/comp/KXDW4H/caucasian-driver-reading-magazine-in-autonomous-car-self-driving-vehicle-KXDW4H.jpg",
    vidLink: "../public/vid.mp4",
  },
  {
    id: 9,
    title: "Cryptography Basics",
    description: "Understand the fundamentals of cryptography. Explore encryption algorithms, key management, and cryptographic protocols used to secure information.",
    price: 200,
    author: "Fiona Wilson",
    authorAvater: "https://www.springboard.com/blog/wp-content/uploads/2018/07/image4.png",
    vidLink: "../public/vid.mp4",
  },

];





// get all courses
router.get("/courses", (req, res, next) => {
  console.log('all courses')
  try {
    // Send the predefined array as the response
    return res.status(200).send(predefinedCourses);
  } catch (error) {
    next(error);
  }
});


// add course
router.post("/add/course", async (req, res, next) => {
  try {
    const { title, descriptions, price, vidLink } = req.body;

    const course = await Course.create({
      title,
      descriptions,
      price,
      vidLink,
    });

    if (course) return res.status(201).send(course);
  } catch (error) {
    next(error);
  }
});

// get course by user ID
// get course by user ID
router.get("/courses/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Find the course in the predefinedCourses array
    const course = predefinedCourses.find((course) => course.id == id);

    if (course) {
      return res.status(200).send(course);
    } else {
      return res.status(404).send({ error: "Course not found" });
    }
  } catch (error) {
    next(error);
  }
});


// migraions
router.get("/pop", async (req, res, next) => {
  const done = await Course.insertMany([
    {
      title: "React",
      descriptions: "React course",
      price: 200,
      author: "Khalid",
      authorAvater: "http://127.0.0.1:3000/avater.jpg",
      vidLink: "../public/vid.mp4",
    },
    {
      title: "Angular",
      descriptions: "Angular course",
      price: 20,
      author: "Khalid",
      authorAvater: "http://127.0.0.1:3000/avater.jpg",
      vidLink: "../public/vid.mp4",
    },
    {
      title: "Vue",
      descriptions: "Vue course",
      price: 209,
      author: "Khalid",
      authorAvater: "../public/avater.jpg",
      vidLink: "../public/vid.mp4",
    },
    {
      title: "JavaScript",
      descriptions: "JavaScript course",
      price: 500,
      author: "Khalid",
      authorAvater: "../public/avater.jpg",
      vidLink: "../public/vid.mp4",
    },
  ]);
  console.log(done);
});

module.exports = router;
