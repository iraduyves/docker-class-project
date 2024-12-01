import Product from '../models/Product.js';



//  (CREATE)
export const saveProduct = async (req, res) => {
    try {
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });
        await product.save();
        return res.status(201).json({
            status: 201,
            message: 'Product created successfully!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        });
    }
}

//  (READ)
export const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            status: 200,
            data: products
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        });
    }
}

//  (UPDATE)
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                status: 404,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Product updated successfully!',
            data: updatedProduct
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        });
    }
}

//  (DELETE)
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                status: 404,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Product deleted successfully!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        });
    }
}
