import React, {useState} from 'react';
import './faq.css'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 


const Faq = () => {
  const faqsData = [
    {
      question: 'What is your return policy?',
      answer: 'Our return policy allows you to return items within 30 days of purchase for a full refund.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time by going to your account settings and selecting "Cancel Subscription."',
    },
    {
      question: 'How do I access my course materials?',
      answer: 'Once you have enrolled in a course, you can access your course materials by logging in to your account and navigating to "My Courses."',
    },
    {
      question: 'Are the courses self-paced or scheduled?',
      answer: 'Our courses are self-paced, allowing you to study at your own convenience. However, some courses may have scheduled live sessions or assignments with deadlines.',
    },
    {
      question: 'Do you offer financial aid or scholarships?',
      answer: 'Yes, we offer financial aid and scholarships for eligible students. You can apply for financial aid during the enrollment process.',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can contact our support team by emailing support@example.com or using the live chat feature on our website.',
    },
    {
      question: 'Can I switch my enrolled course?',
      answer: 'Yes, you can switch to a different course within the first 7 days of enrollment. Contact our support team to assist you with the process.',
    },
    {
      question: 'Is there a mobile app for the academy?',
      answer: 'Yes, we have a mobile app available for both iOS and Android devices. You can download it from the respective app stores.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept payments through credit/debit cards, PayPal, and other popular payment gateways.',
    },
    {
      question: 'Can I download course materials for offline use?',
      answer: 'Yes, some courses offer downloadable materials for offline use. Look for the download option on the course page.',
    },



   
  ];
 
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question === selectedQuestion ? null : question);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <ul>
        {faqsData.map((faq, index) => (
          <li style={{listStyleType:"none"}}
            key={index}
            className={`faq-item ${selectedQuestion === faq.question ? 'active' : ''}`}
            onClick={() => handleQuestionClick(faq.question)}
          >
            <strong>
              {faq.question}{' '}
              {selectedQuestion === faq.question ? <FaChevronUp /> : <FaChevronDown />}
            </strong>
            {selectedQuestion === faq.question && <p>{faq.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Faq;
