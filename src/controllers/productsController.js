const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products

	index: (req, res) => {
		res.render('products', {products : products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		idDetail = parseInt(req.params.id);
		const detailedProduct = products.filter(product => product.id === idDetail);
		
		res.render('detail', {products: detailedProduct});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// I read inputs and then store them in variables.
		const name = req.body.name;
		const price = req.body.price;
		const discount = req.body.discount;
		const category = req.body.category;
		const description = req.body.description;
		const image = req.file.originalname;

		// got them fused in a Object Literal;
		const fuseData = { id: products.length + 1,
			name: name, price: price, discount: discount, category: category, description: description, image: image};

		// 	Insert them, then they got sent away to the database.
		products.push(fuseData);
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
		console.log(req.file.image, req.body.image);
		//finally, you got kicked back to products for good.
		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		idDetail = parseInt(req.params.id);
		const detailedProduct = products.filter(product => product.id === idDetail);

		res.render('product-edit-form', {productToEdit: detailedProduct});
	},
	// Update - Method to update
	update: (req, res) => {
		const id = parseInt(req.params.id);
		const name = req.body.name;
		const price = req.body.price;
		const discount = req.body.discount;
		const category = req.body.category;
		const description = req.body.description;
		const productToUpdate = products.filter(product => product.id === id);
		
		productToUpdate[0].name = name;
		productToUpdate[0].price = price;
		productToUpdate[0].discount = discount;
		productToUpdate[0].category = category;
		productToUpdate[0].description = description;

		products[id-1] = products[id-1] = productToUpdate[0];

		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
		


		res.redirect('/products/detail/' + id);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;