const { Product } = require('../app/models');

async function findAllProducts(req, res) {
    try {
        const products = await Product.findAll(req.body);
        res.json(products);      
      
    } catch (error) {
        console.log(error)

        res.send(JSON.stringify({"status": 302, "error": error}));
    }
}

async function findProductById(req, res) {
    try {
        const product = await Product.findByPk(req.params.id);
        res.json(product);      
    } catch (error) {
        console.log(error)

        res.send(JSON.stringify({"status": 302, "error": error}));
    }
}

module.exports = {
    findAllProducts,
    findProductById
}