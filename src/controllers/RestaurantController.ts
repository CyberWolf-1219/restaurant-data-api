import { Handler } from 'express';
import Restaurant from '../models/Restaurant';

export const createRestaurant: Handler = async (req, res, next) => {
  console.log('RESTAURANT CREATE '.padEnd(80, '='));
  try {
    const newRestaurantData = req.body;
    const isInDB = await Restaurant.findOne({ name: newRestaurantData.name });
    if (isInDB) {
      throw new Error(
        `[-] AN ENTRY WITH NAME:${newRestaurantData.name} IS ALREADY EXISTS IN THE DB`
      );
    }

    const newRestaurant = new Restaurant(newRestaurantData);
    await newRestaurant.validate();
    const saveResult = await newRestaurant.save();
    console.log(saveResult);
    res.status(200).json({
      message: {
        links: {
          index: '/restaurants/',
          view: `restaurants/${saveResult.id}`,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
  console.log(''.padEnd(80, '='));
};

export const getAllRestaurants: Handler = async (req, res, next) => {
  console.log('RESTAURANT INDEX '.padEnd(80, '='));
  try {
    const result = await Restaurant.find();
    console.log(result);
    res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
  console.log(''.padEnd(80, '='));
};

export const viewRestaurant: Handler = async (req, res, next) => {
  console.log('RESTAURANT VIEW '.padEnd(80, '='));
  try {
    const params = req.params;
    if (!params.restaurant_id) {
      throw new Error('[-] NO RESTAURANT ID WAS SENT');
    }

    const queryResult = await Restaurant.findById(params.restaurant_id);
    console.log(queryResult);
    res.status(200).json({ message: queryResult });
  } catch (error) {
    res.status(500).json({ messag: error });
  }
  console.log(''.padEnd(80, '='));
};

export const updateRestaurant: Handler = async (req, res, next) => {
  console.log('RESTAURANT UPDATE '.padEnd(80, '='));
  try {
    const updateData = req.body;
    console.log(updateData);
    const updateResult = await Restaurant.updateOne(
      { _id: updateData._id },
      updateData
    );
    console.log(updateResult);
    res.status(200).json({ message: updateResult });
  } catch (error) {
    res.status(500).json({ message: error });
  }

  console.log(''.padEnd(80, '='));
};

export const removeRestaurant: Handler = async (req, res, next) => {
  console.log('RESTAURANT REMOVE '.padEnd(80, '='));
  try {
    const id = req.params.restaurant_id;
    console.log(id);
    if (!id) {
      throw new Error('[-] NO RESTAURANT ID WAS PROVIDED');
    }

    const removeResult = await Restaurant.deleteOne({ _id: id });
    console.log(removeResult);
    res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
  console.log(''.padEnd(80, '='));
};
