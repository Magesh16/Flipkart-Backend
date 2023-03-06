import express from 'express';
import { getCategory, postCategory,getAllSubcategoryProducts } from '../../Controllers/ProductsController/category.js';
import { getProducts, postProducts } from '../../Controllers/ProductsController/productItem.js';
import { getSegment, postSegment,getCategorySubcategory } from '../../Controllers/ProductsController/segment.js';
import { getSubcategory, postSubcategory ,getSubcategoryProducts} from '../../Controllers/ProductsController/subCategory.js';
// import refToken from '../../middlewares/authorization.js';


let routes = express.Router();

routes.get('/getSegment/:id', getSegment);
routes.post('/postSegment', postSegment);
routes.get('/getCategorySubcategory',getCategorySubcategory);

routes.get('/getCategory',getCategory);
routes.post('/postCategory', postCategory);

routes.get('/getSubcategory', getSubcategory);
routes.get('/getSubcategoryProducts',getSubcategoryProducts);
routes.get('/getSubcategoryProducts/:id',getSubcategoryProducts);
routes.get('/getAllSubcategoryProducts', getAllSubcategoryProducts);
routes.post('/postSubcategory', postSubcategory);

routes.get('/getProduct/:id', getProducts);
routes.post('/postProducts', postProducts)


export default routes;