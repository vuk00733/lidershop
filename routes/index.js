const express = require('express')
const router = express.Router()
const path = require('path')
const Story = require('../models/Story')
const Purchase = require('../models/Purchase')

// @desc    Login/Landing page
// @route   GET /
/*router.get('/', (req, res) => {
 res.render('index', {
    layout: 'main',
  })
// res.sendFile('index.html');
})

router.post('/payment', async (req, res) => {
  try {
    await Story.create(req.body)
    //res.redirect('back');
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.post('/purchase', async (req, res) => {
  try {
        await Purchase.create(req.body)
   // res.redirect('/')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})
*/
module.exports = router
