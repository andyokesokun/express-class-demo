export interface Car{
    id?: number 
    name: string;
    model: string;
    color: string;
    price: number;
    brand: string;
    year: Date
}

const cars: Car[]  = [
    {
      id: 1,
      name: "Camary",
      model: "XL",
      color: "white",
      price: 8000000,
      year: new Date('2012-01-01'),
      brand: 'Toyota'
    },
    {
      id:2, 
      name: "Civic",
      model: "EX",
      color: "black",
      price: 9000000,
      year: new Date('2018-05-15'),
      brand: 'Honda'
    },
    {
      id:3,
      name: "Model S",
      model: "Plaid",
      color: "red",
      price: 12000000,
      year: new Date('2021-03-10'),
      brand: 'Tesla'
    },
    {
      id:4,
      name: "Mustang",
      model: "GT",
      color: "blue",
      price: 10000000,
      year: new Date('2019-07-20'),
      brand: 'Ford'
    },
    {
      id: 5,
      name: "Altima",
      model: "SV",
      color: "gray",
      price: 8500000,
      year: new Date('2016-11-11'),
      brand: 'Nissan'
    }
]

 const getListOfCars =  () => {    
    return cars;
}

const create = (car: Car) =>{
    const cars = getListOfCars();
    const id = cars.length + 1;
    const carObj = {
        ...car,
        id,
    } 
    cars.push(carObj);

    return carObj;
}

const getById = (id: number) =>  {
    const cars = getListOfCars();
    return cars.find(car =>  car.id === id);
}

const CarModel ={
    getListOfCars,
    getById,
    create
}

export default CarModel;






