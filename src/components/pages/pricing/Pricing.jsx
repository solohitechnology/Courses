import React from 'react';
// import { Helmet } from 'react-helmet';
import './Pricing.css';

const Pricing = () => {
  const plans = [
    {
      title: 'Basic Plan',
      price: '$9.99/month',
      features: [
        'Access to all free courses',
        'Basic support',
        'Limited quizzes',
        'No certification',
      ],
    },
    {
      title: 'Pro Plan',
      price: '$19.99/month',
      features: [
        'Access to all courses',
        'Priority support',
        'Unlimited quizzes',
        'Certification upon completion',
      ],
    },
    {
      title: 'Enterprise Plan',
      price: 'Custom',
      features: [
        'Custom features',
        'Dedicated account manager',
        '24/7 support',
        'Custom certification options',
        'Personalized course recommendations',
      ],
    },
    {
      title: 'Team Plan',
      price: '$49.99/month per user',
      features: [
        'Access to all courses',
        'Priority support',
        'Unlimited quizzes',
        'Certification upon completion',
        'Team collaboration features',
        'Advanced reporting',
      ],
    },
  ];

  return (
    <>
    {/* <Helmet>
      <title>Ogendu Academy Pricing</title>
    </Helmet> */}

    <div className="pricing-page">
      <h1>Pricing</h1>
      <p>Choose the plan that best fits your learning needs and goals.</p>
      <div className="plans">
        {plans.map((plan, index) => (
          <div key={index} className="plan">
            <h2>{plan.title}</h2>
            <h3>{plan.price}</h3>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button>Choose Plan</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Pricing;
