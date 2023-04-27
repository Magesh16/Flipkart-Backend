import express from  'express';
import refToken from '../../middlewares/authorization.js';
import { getGiftCards} from '../../controllers/giftCardController.js/giftCards.js';
import { getCardCategory } from '../../controllers/giftCardController.js/giftCardCategory.js';
import { getGiftCardItems } from '../../controllers/giftCardController.js/giftCardItem.js';
import { getGiftCardReviews, postGiftCardReviews, upateGiftCardDislikeCount, updateGiftCardLikeCount } from '../../controllers/giftCardController.js/giftCardReviewItems.js';

let routes = express.Router();

routes.get('/getGiftCards',getGiftCards);
routes.get('/getGiftCards/getCardCategory/:id',getCardCategory)
routes.get('/getGiftCards/getCardCategory/getGiftCardItems/:id', getGiftCardItems)
routes.get('/getGiftCardReviews/:id',refToken, getGiftCardReviews )
routes.post('/postGiftCardReviews',refToken, postGiftCardReviews )
routes.put('/updateGiftCardLikeCount/:id',updateGiftCardLikeCount);
routes.put('/upateGiftCardDislikeCount/:id',upateGiftCardDislikeCount);

export default routes;