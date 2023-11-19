const Products = require('../models/products');

exports.addProduct = async (req, res) => {
    try {
        let { name, price, mrp, stock, isPublished } = req.body;
        isPublished = false;

        let product_id; 
        let prod = await Products.findOne({}); 

        if(!prod) product_id = 1;
        else product_id = prod.product_id + 1;

        let dataToSend = {
            name, price, mrp, stock, product_id, isPublished : false
        }

        let product = await Products.create(dataToSend);
        if (!product) {
            throw new Error("Something went wrong, please try again later");
        }

        res.status(201).json(product);
    } catch (err) {
        res.status(405).json({ message: err.message });
    }
};

exports.listProduct = async (req, res) => {
    try {
        let products = await Products.findAll(); 
        res.status(200).json(products);
    } catch (err) {
        res.status(405).json({ message: err.message });
    }
};

exports.publishProduct = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let product = await Products.findOne({where: { id }}); 

        console.log(id,product);

        let error = [];
        if(product.mrp < product.price){
            error.push("MRP should be less than equal to the Price")
        }
        if(product.stock <= 0){
            error.push("Stock count is 0")
        }

        if(error.length) throw new Error(error);

        
        let product1 = await Products.update({isPublished: true, updated_at: new Date().getTime() }, { where: { id }});

        
        res.status(204).json(product1);
    } catch (err) {
        let error = err.message.split(',');
        console.log(error);
        res.status(422).json(error);
    }
};

exports.putProduct = async (req, res) => {
    res.status(405).json();
};


exports.deleteProduct = async (req, res) => {
    res.status(405).json();
};