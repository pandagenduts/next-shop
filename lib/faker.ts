import { faker } from '@faker-js/faker';

export const randomNumber = () => faker.number.int({ min: 1, max: 10000 })