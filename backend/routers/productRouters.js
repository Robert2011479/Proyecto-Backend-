    //routes/productRouters.js
    const express = require('express');

    const router = express.Router();
    const productController = require('../controllers/productController');
    //solicitud de tipo get en la url
    router.get('/',(req, res)=> productController.getProducts(req, res));
    //solicitud de tipo get en la url
    router.get('/:id',(req, res)=> productController.getProductById(req, res));
    //solicitud de tipo post en la url
    router.post('/',(req, res)=> productController.createProduct(req, res));
    //solicitud de tipo put en la url
    router.put('/:id',(req, res)=> productController.updateProduct(req, res));
    //solicitud de tipo delete en la url
    router.delete('/:id',(req, res)=> productController.deleteProduct(req, res));

    module.exports = router;