const router = require('express').Router();
const controller = require('../controllers/products');

router.post('/products', controller.addProduct);
router.get('/products', controller.listProduct);
router.patch('/products/:id', controller.publishProduct);
router.put('/products/:id', controller.putProduct);
router.delete('/products/:id', controller.deleteProduct);

module.exports = router;
