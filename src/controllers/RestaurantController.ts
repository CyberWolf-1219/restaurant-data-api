import { Handler } from 'express';

export const createRestaurant: Handler = (req, res, next) => {
  console.log(req.url);
  res.status(200).send('ALL ENTRIES');
};

export const getAllRestaurants: Handler = (req, res, next) => {
  console.log(req.url);
  res.status(200).send('ALL ENTRIES');
};

export const viewRestaurant: Handler = (req, res, next) => {
  console.log(req.params);
  res.status(200).send('ONE ENTRY');
};

export const updateRestaurant: Handler = (req, res, next) => {
  console.log(req.url);
  res.status(200).send('ALL');
};

export const removeRestaurant: Handler = (req, res, next) => {
  console.log(req.url);
  res.status(200).send('ALL');
};
