import express from 'express';
import { saveProduct, getProduct, updateProduct, deleteProduct } from '../controllers/Products.Controller.js';

const ProductRouter = express.Router();

/**
 * @swagger
 * /product/GetProducts:
 *   get:
 *     summary: Get all products
 *     description: Fetch a list of all products in the database.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 */
ProductRouter.get('/GetProducts', getProduct);

/**
 * @swagger
 * /product/CreateProducts:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product by providing a title, description, and price.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully.
 */
ProductRouter.post('/CreateProducts', saveProduct);  // Corrected here

/**
 * @swagger
 * /product/GetProductsById/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Update a product's details using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       404:
 *         description: Product not found.
 */
ProductRouter.put('/UpdateProductsById/:id', updateProduct);

/**
 * @swagger
 * /product/Delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 */
ProductRouter.delete('/Delete/:id', deleteProduct);

export default ProductRouter;
