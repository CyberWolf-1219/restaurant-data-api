import express from 'express';
import { createRestaurant, getAllRestaurants, removeRestaurant, updateRestaurant, viewRestaurant } from '../controllers/RestaurantController';

const RestaurantRoute = express.Router();

RestaurantRoute.get('/', getAllRestaurants)

RestaurantRoute.get('/:restaurant_id', viewRestaurant)

RestaurantRoute.post('/create', createRestaurant)

RestaurantRoute.put('/update', updateRestaurant)

RestaurantRoute.delete('/remove', removeRestaurant)

export default RestaurantRoute;