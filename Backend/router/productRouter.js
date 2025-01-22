const express = require('express');
const router = express.Router();
const Product = require('../model/ProductSchema');
const fetchController = require('../controller/fetchController');
const recommendProductsController = require('../controller/recommendationController');
const Event = require('../model/UserTracker');

router.get('/products', fetchController(Product)); 

router.get('/recommendations/:userId', recommendProductsController(Event, Product));

module.exports = router;