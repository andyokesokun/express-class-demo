import { Request, Response } from "express";
import CarModel, { Car } from "../models/car";

const getCars = (req: Request, res: Response) => {
  // const cars = CarModel.getListOfCars();
  const { getListOfCars } = CarModel;
  res.json(getListOfCars()).status(200);
};

const createCar = (req: Request, res: Response) => {
    // const cars = CarModel.getListOfCars();
    const car = req.body as Car
    const { create } = CarModel;
    const carData = create(car);
    res.json(carData).status(201);
  }

  const findById = (req: Request, res: Response) => {
    const {id} = req.params
    const { getById } = CarModel;
    const carData = getById(Number(id));
    
    if(carData){
        res.json(carData).status(200);
    }else{
        res.status(400).json({message: "Not found"});
    }

  }

const CarController = {
  getCars,
  createCar,
  findById
};

export default CarController;
