const express = require('express');
const request = require('request');
const router = express.Router();

const HomeControllers = require('../controllers/home');


module.exports = () =>{
	
	router.get('/', HomeControllers.index_Get);
	
	
	
	
	
	return router;
}