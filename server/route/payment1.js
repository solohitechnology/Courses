const axios = require('axios');
const express = require('express')

const router = express.Router()

const paystackSecretKey = process.env.PAYSTACKEY; 



router.get('/payment', (req, res) => {

    const transferData = {
      source: 'balance', 
      amount: 50, // Amount to transfer in kobo (NGN 5000)
      recipient: '3062381085',
      currency: 'NGN',
      reason: 'Salary Payment', 
    };
    
    axios({
      method: 'post',
      url: 'https://api.paystack.co/transfer',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      data: transferData,
    })
      .then(response => {
        console.log('Transfer initiated:', response.data);
        
      })
      .catch(error => {
        console.error('Transfer failed:', error);
      });
})




  export default router;
