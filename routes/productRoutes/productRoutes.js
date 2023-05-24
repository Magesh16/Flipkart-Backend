import express from 'express';
import { getCartDetails, postCartDetails, updateCartDetails, removeCartDetails,saveForLater, moveToCart } from '../../controllers/productsController/cartItem.js';
import { getCategory, postCategory,getAllSubcategoryProducts } from '../../controllers/productsController/category.js';
import { paymentItem, success,failure } from '../../controllers/productsController/paymentItems.js';
import { getProducts, postProducts } from '../../controllers/productsController/productItem.js';
import { getReviews, postReviews, updateDislikeCount, updateLikeCount } from '../../controllers/productsController/reviewItem.js';
import { getSegment, postSegment,getCategorySubcategory } from '../../controllers/productsController/segment.js';
import { getSubcategory, postSubcategory ,getSubcategoryProducts, priceLowToHigh, priceHighToLow} from '../../controllers/productsController/subCategory.js';
import { getWishList, postWishList, removeWishList } from '../../controllers/productsController/wishlistItem.js';
import {getOrders} from '../../controllers/productsController/productOrders.js'
import refToken from '../../middlewares/authorization.js';
import { getDeliveryStatus, updateDeliveryStatus } from '../../controllers/productsController/shipment.js';
import { getCoupons, postCoupons } from '../../controllers/productsController/coupons.js';
import { getShippedDetailsHelpCenter, getViewMore } from '../../controllers/productsController/helpCenter.js';  
import {getAllProducts, pushToElasticSearch, searchName, totalProducts} from '../../controllers/productsController/searchEngine.js';
let routes = express.Router();

routes.get('/getSegment/:id', getSegment);
routes.post('/postSegment', postSegment);
routes.get('/getCategorySubcategory',getCategorySubcategory);

routes.get('/getCategory',getCategory);
routes.post('/postCategory', postCategory);

routes.get('/getSubcategory', getSubcategory);
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
routes.put('/moveToCart/:id', refToken, moveToCart)

routes.get('/getWishList', refToken, getWishList)
routes.post('/postWishList/:id',refToken, postWishList)
routes.delete('/removeWishList/:id',refToken,removeWishList);

routes.get('/paymentItem',refToken, paymentItem);
routes.get('/success',success)
routes.get('/failure',failure)

routes.get('/getOrders',refToken, getOrders)

routes.get('/getDeliveryStatus/:id',refToken,getDeliveryStatus);
routes.put('/updateDeliveryStatus',refToken,updateDeliveryStatus);

routes.get('/getCoupons',getCoupons);
routes.post('/postCoupons',postCoupons);

routes.get('/getShippedDetailsHelpCenter',refToken, getShippedDetailsHelpCenter);
routes.get('/getViewMore',getViewMore);

routes.get('/search',searchName);
routes.get('/alldata',getAllProducts);
routes.get('/es/getSubcategoryProducts/:id',totalProducts)


// routes.get('/es/rating/getSubcategoryProducts/:id',getRating)
// routes.get('/es/fassured/getSubcategoryProducts/:id',getFlipkartAssured);
// routes.get('/es/priceLowToHigh/getSubcategoryProducts/:id',priceLowToHigh);

routes.post('/postElasticSearch',pushToElasticSearch)


export default routes;