import dayjs from "dayjs";

export default function getNext7Days() {
  const today = dayjs();
  const days = [];

  for (let i = 0; i < 7; i++) {
    const day = today.add(i, "day");
    days.push({
      date: day.format("DD MMM"),
      dayOfWeek: day.isSame(dayjs(), "day") ? "Today" : day.format("dddd"),
    });
  }

  return days;
}
