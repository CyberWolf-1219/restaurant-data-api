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

export const viewRestaurant: Handler = async (req, res, next) => {
  console.log("RESTAURANT VIEW ".padEnd(80, "="))
  try {
    const params = req.params;
    if (!params.restaurant_id) {
      throw new Error('[-] NO RESTAURANT ID WAS SENT')
    }

    const queryResult = await Restaurant.findById(params.restaurant_id);
    console.log(queryResult)
    res.status(200).json({ message: queryResult });
  } catch (error) {
    res.status(500).json({ messag: error })
  }
  console.log("".padEnd(80, "="))
};

export const updateRestaurant: Handler = async (req, res, next) => {
  console.log("RESTAURANT VIEW ".padEnd(80, "="))
  try {
    const updateData = req.body;
    console.log(updateData);
    const updateResult = await Restaurant.updateOne({ _id: updateData._id }, updateData);
    console.log(updateResult)
    res.status(200).json({ message: updateResult });
  } catch (error) {
    res.status(500).json({ message: error });
  }

  console.log("".padEnd(80, "="))
};

export const removeRestaurant: Handler = (req, res, next) => {
  console.log(req.url);
  res.status(200).json({ message: 'REMOVED' });
};
