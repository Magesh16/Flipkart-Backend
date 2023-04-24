import express from 'express';
import { getCartDetails, postCartDetails, updateCartDetails, removeCartDetails,saveForLater, moveToCart } from '../../Controllers/ProductsController/cartItem.js';
import { getCategory, postCategory,getAllSubcategoryProducts } from '../../Controllers/ProductsController/category.js';
import { paymentItem, success,failure } from '../../Controllers/ProductsController/paymentItems.js';
import { getProducts, postProducts } from '../../Controllers/ProductsController/productItem.js';
import { getReviews, postReviews, updateDislikeCount, updateLikeCount } from '../../Controllers/ProductsController/reviewItem.js';
import { getSegment, postSegment,getCategorySubcategory } from '../../Controllers/ProductsController/segment.js';
import { getSubcategory, postSubcategory ,getSubcategoryProducts} from '../../Controllers/ProductsController/subCategory.js';
import { getWishList, postWishList, removeWishList } from '../../Controllers/ProductsController/wishlistItem.js';
import {getOrders} from '../../Controllers/ProductsController/productOrders.js'
import refToken from '../../middlewares/authorization.js';
import { getDeliveryStatus, updateDeliveryStatus } from '../../Controllers/ProductsController/shipment.js';
import { getCoupons, postCoupons } from '../../Controllers/ProductsController/coupons.js';
import { getShippedDetailsHelpCenter, getViewMore } from '../../Controllers/ProductsController/helpCenter.js';  
import phraseSearch from '../../Controllers/ProductsController/searchEngine.js';
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

routes.get('/getReviews/:product_items_id', getReviews);
routes.post('/postReviews',refToken, postReviews);
routes.put('/updateLikeCount/:id',updateLikeCount)
routes.put('/updateDislikeCount/:id',updateDislikeCount)

routes.get('/getCartDetails',refToken, getCartDetails)
routes.post('/postCartDetails', refToken, postCartDetails)
routes.patch('/updateCartDetails/:id',refToken,updateCartDetails);
routes.delete('/removeCartDetails/:id',refToken,removeCartDetails);
routes.put('/saveForLater/:id',refToken,saveForLater)
routes.put('/moveTocart/:id', refToken, moveToCart)

routes.get('/getWishList', refToken, getWishList)
routes.post('/postWishList/:id',refToken, postWishList)
routes.delete('/removeWishList/:id',refToken,removeWishList);

routes.get('/paymentItem',refToken, paymentItem);
routes.post('/success',success)
routes.post('/failure',failure)

routes.get('/getOrders',refToken, getOrders)

routes.get('/getDeliveryStatus/:id',refToken,getDeliveryStatus);
routes.put('/updateDeliveryStatus',refToken,updateDeliveryStatus);

routes.get('/getCoupons',getCoupons)
routes.post('/postCoupons',postCoupons);

routes.get('/getShippedDetailsHelpCenter',refToken, getShippedDetailsHelpCenter);
routes.get('/getViewMore',getViewMore);

routes.get('/products/search/',phraseSearch);


export default routes;