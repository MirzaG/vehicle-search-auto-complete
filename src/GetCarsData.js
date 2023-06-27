import {faker} from '@faker-js/faker';

const createRandomVehicle = () => {
    return {
      Id: faker.datatype.uuid(),
      Name: `${faker.vehicle.manufacturer()} ${faker.vehicle.vehicle()}`,
      RegistrationNumber: faker.vehicle.vrm(),
      Price: faker.number.int({ min: 10000, max: 200000 }),
      Model: faker.vehicle.model(),
      Manufacturer: faker.vehicle.manufacturer(),
      RegisteredAt: faker.date.past(),
    };
  }
  
export const CARS = faker.helpers.multiple(createRandomVehicle, {
    count: 500,
});