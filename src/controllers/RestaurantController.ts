import { Handler } from 'express';
import Restaurant from '../models/Restaurant'

export const createRestaurant: Handler = async (req, res, next) => {
  console.log("RESTAURANT CREATE ".padEnd(80, "="));
  try {
    const newRestaurantData = req.body
    const newRestaurant = new Restaurant(newRestaurantData);
    const validationResult = await newRestaurant.validate()
    console.log(validationResult)
    const saveResult = await newRestaurant.save();
    console.log(saveResult)
    res.status(200).json({ message: 'OK' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
  console.log("".padEnd(80, "="))
};

export const getAllRestaurants: Handler = async (req, res, next) => {
  console.log("RESTAURANT INDEX ".padEnd(80, "="))
  try {
    const result = await Restaurant.find();
    console.log(result)
    res.status(200).json({ message: result });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
  console.log("".padEnd(80, "="))
};

export const viewRestaurant: Handler = (req, res, next) => {
  console.log(req.params);
  res.status(200).json({ message: 'ONE ENTRY' });
};

export const updateRestaurant: Handler = (req, res, next) => {
  console.log(req.url);
  res.status(200).json({ message: 'UPDATED' });
};

export const removeRestaurant: Handler = (req, res, next) => {
  console.log(req.url);
  res.status(200).json({ message: 'REMOVED' });
};
