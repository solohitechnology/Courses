const express = require('express');
const Subscribe = require('../model/subscription');
const router = express.Router()


router.post('/subscription', async (req, res) => {
    console.log('new subscribtion')
    const { email } = req.body;

    try {
        if (email === '' || null) {
            return res.status(402).send('email is require')
        }
        const findEmail = await Subscribe.findOne({ email })
        if (findEmail) {
            return res.status(401).send('already a user')
        } else {
            const newEmail = new Subscribe({
                email: req.body.email
            })
            await newEmail.save()
            res.status(200).send('successfully subscribe')
        }

    } catch (e) {
        console.log(e)
    }
})

module.exports = router