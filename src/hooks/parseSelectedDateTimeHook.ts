export const parseSelectedDateTime = (
  selectedDate: string,
  selectedTime: string
) => {
  const [startTime, endTime] = selectedTime.split(" - ");
  const [startHours12, startMinutes, startPeriod] = startTime.split(/[: ]/);
  const [endHours12, endMinutes, endPeriod] = endTime.split(/[: ]/);

  let startHours = parseInt(startHours12, 10);
  let endHours = parseInt(endHours12, 10);

  if (startPeriod === "PM" && startHours !== 12) {
    startHours += 12;
  } else if (startPeriod === "AM" && startHours === 12) {
    startHours = 0;
  }

  if (endPeriod === "PM" && endHours !== 12) {
    endHours += 12;
  } else if (endPeriod === "AM" && endHours === 12) {
    endHours = 0;
  }

  const [weekday, month, day, year] = selectedDate.split(" ");
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

  const startDate = new Date(
    Date.UTC(
      parseInt(year, 10),
      monthIndex,
      parseInt(day, 10),
      startHours,
      parseInt(startMinutes, 10)
    )
  );
  const endDate = new Date(
    Date.UTC(
      parseInt(year, 10),
      monthIndex,
      parseInt(day, 10),
      endHours,
      parseInt(endMinutes, 10)
    )
  );

  const formatDateWithoutTimezone = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  return {
    start: formatDateWithoutTimezone(startDate),
    end: formatDateWithoutTimezone(endDate),
  };
};
