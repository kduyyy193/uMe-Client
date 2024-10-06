import { v4 as uuidv4 } from "uuid";

const randomId = () => {
  const id = uuidv4();
  return id;
};

const fakeApi = (timeDelay: number = 1000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeDelay);
  });
};

export { randomId, fakeApi };
