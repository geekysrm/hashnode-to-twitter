export default function getTodaysDate() {
  const today = new Date();
  const date = String(today.getDate()).padStart(2, "0");
  const month = today
    .toLocaleString("default", { month: "long" })
    .substring(0, 3);
  const year = String(today.getFullYear());
  const fullDate = `${month} ${date}, ${year}`;
  const fullTime = today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return {
    date: fullDate,
    time: fullTime,
  };
}
