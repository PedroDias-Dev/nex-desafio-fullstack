const { Product } = require('../app/models');

async function findAllProducts(req, res) {
    try {
        const products = await Product.findAll(req.body);
        res.json(products);      
      
    } catch (error) {
        console.log(error)

        res.status(500).send(JSON.stringify({"status": 500, "error": error}));
    }
}

async function findProductById(req, res) {
    try {
        const product = await Product.findByPk(req.params.id);
        res.json(product);      
    } catch (error) {
        console.log(error)

        res.status(500).send(JSON.stringify({"status": 500, "error": error}));
    }
}

module.exports = {
    findAllProducts,
    findProductById
}