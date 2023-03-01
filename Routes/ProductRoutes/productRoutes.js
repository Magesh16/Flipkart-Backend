import express from 'express';
import { getCategory, postCategory } from '../../Controllers/ProductsController/category.js';
import { getSegment, postSegment } from '../../Controllers/ProductsController/segment.js';
import { getSubcategory, postSubcategory } from '../../Controllers/ProductsController/subCategory.js';
// import refToken from '../../middlewares/authorization.js';


let routes = express.Router();

routes.get('/getSegment', getSegment);
routes.post('/postSegment', postSegment);

routes.get('/getCategory',getCategory);
routes.post('/postCategory', postCategory);

routes.get('/getSubcategory', getSubcategory);
routes.post('/postSubcategory', postSubcategory);

export default routes;