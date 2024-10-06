import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function getTimeSlots() {
  const start = dayjs().hour(8).minute(0);
  const end = dayjs().hour(20).minute(0);
  const interval = dayjs.duration(30, "minutes");

  const slots = [];
  let current = start;

  while (current <= end) {
    slots.push(current.format("hh:mm A"));
    current = current.add(interval);
  }

  return slots;
}
