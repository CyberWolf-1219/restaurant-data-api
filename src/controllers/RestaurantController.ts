import { Handler } from 'express';
import Restaurant from '../models/Restaurant';

export const createRestaurant: Handler = async (req, res, next) => {
  console.log('RESTAURANT CREATE '.padEnd(80, '='));
  try {
    const newRestaurantData = req.body;
    console.log(newRestaurantData);

    if (!newRestaurantData) {
      throw new Error('INVALID REQUEST DATA');
    }

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
    const results = await Restaurant.find();
    console.log(results);
    const payload = results.map((result, i) => {
      return {
        name: result.name,
        rating: result.rating,
        address: result.address,
        contacts: result.contacts,
        links: {
          view: `/restaurants/${result.id}`,
        },
      };
    });
    res.status(200).json({ message: payload });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
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
    const payload = {
      ...queryResult?.toObject(),
      links: {
        index: `/restaurants`,
        update: `/restaurants/update`,
        remove: `/restaurants/remove/${queryResult?.id}`,
      },
    };
    res.status(200).json({ message: payload });
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

    if (!updateData._id) {
      throw new Error('[-] INVALID PAYLOAD: NO ID WAS PROVIDED');
    }

    const updateResult = await Restaurant.updateOne(
      { _id: updateData._id },
      updateData
    );
    console.log(updateResult);

    const payload = {
      ...updateResult,
      links: {
        index: `/restaurants/`,
      },
    };
    res.status(200).json({ message: payload });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }

  console.log(''.padEnd(80, '='));
};

export const removeRestaurant: Handler = async (req, res, next) => {
  console.log('RESTAURANT REMOVE '.padEnd(80, '='));
  try {
    const id = req.params.restaurant_id;
    console.log(id);

    if (!id) {
      throw new Error('[-] INVALID REQUEST: NO ID WAS PROVIDED');
    }

    const removeResult = await Restaurant.deleteOne({ _id: id });
    console.log(removeResult);

    const payload = {
      ...removeResult,
      links: {
        index: `/restaurants/`,
      },
    };

    res.status(200).json({ message: payload });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
  console.log(''.padEnd(80, '='));
};
