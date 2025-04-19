//Controllers/productController.js
const productService = require('../services/productService');

class productController {
    //req y res son objetos
    //para obtener todos los productos
    async getProducts(req, res) {
        try {
            const products =await productService.getProducts();
            //se obtienen los productos correctamente, se envían como respuesta en formato JSON al cliente.
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Error al obtener los productos'});
        }
    }
   // para obtener un producto
    async getProductById(req,res){
        const { id }= req.params;//(/producto/id:1)
        try {
            const product = await productService.getProductById(id);
            if (!product) {
                return res.status(404).json({message:'Producto no encontrado'})
            }
            res.json(product); // ✅ IMPORTANTE: Enviar el producto si se encontró
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Error al obtener los productos'}); 
        } 
    }
    //para agregar productos res respuestas req solicitules
    async createProduct(req,res) {
        try {
           const {nombre, precio, descripcion}=req.body;
           const newProduct = await productService.addProduct({nombre, precio, descripcion});
           res.status(201).json(newProduct); 
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Error al crear el producto'}); 
        } 
    }
    //para actualizar un producto
    // ✅ Forma correcta:
     async updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { nombre, precio, descripcion } = req.body;
        const updateProduct = await productService.modifyProduct(id, { nombre, precio, descripcion });
        res.json(updateProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
    }
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await productService.removeProduct(id);
            res.sendStatus(204);  
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Error al crear el producto'}); 
        }  
    }
}
module.exports= new productController();