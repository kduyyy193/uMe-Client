import { v4 as uuidv4 } from "uuid";
import notification_sound from "assets/music/notification-sound.mp3";

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

const playNotiSound = () => {
  const audio = new Audio(notification_sound);
  try {
    audio?.play();
  } catch (e) {
    console.log(e);
  }
};

export { randomId, fakeApi, playNotiSound };
