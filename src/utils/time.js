function getCurrentTime() {
  const date = new Date();
  return {
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes()
  };
}

const currentTime = getCurrentTime();

function getTimeFromString(str) {
  const hours = parseInt(str.slice(0, 2), 10);
  const minutes = parseInt(str.slice(2, 4), 10);

  return { hours, minutes };
}

function isOpen(times, current = currentTime) {
  if (!times) {
    return false;
  }

  const slot = times.find(t => t.open.day === current.day);

  if (!slot) {
    return false;
  }

  const openTime = getTimeFromString(slot.open.time);
  const closeTime = getTimeFromString(slot.close.time);

  if (slot.close.day !== current.day) {
    return current.hours > openTime.hours;
  } else {
    return current.hours >= openTime.hours && current.hours <= closeTime.hours;
  }
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getOpenTime(times, current = currentTime, retry = 0) {
  if (!times || retry > 6) {
    return false;
  }

  const slot = times.find(t => t.open.day === current.day);

  if (!slot) {
    return getOpenTime(
      times,
      {
        ...current,
        day: (current.day + 1) % 7
      },
      retry + 1
    );
  }

  const openTime = getTimeFromString(slot.open.time);

  if (currentTime.day === slot.open.day && current.hours > openTime.hours) {
    return getOpenTime(
      times,
      {
        ...current,
        day: (current.day + 1) % 7
      },
      retry + 1
    );
  }

  return `${openTime.hours
    .toString()
    .padStart(2, "0")}.${openTime.minutes.toString().padStart(2, "0")}${
    slot.open.day !== currentTime.day ? ` (${days[slot.open.day]})` : ""
  }`;
}

function getCloseTime(times, current = currentTime) {
  if (!times) {
    return false;
  }

  const slot = times.find(t => t.open.day === current.day);

  if (!slot) {
    return false;
  }

  const closeTime = getTimeFromString(slot.close.time);

  return `${closeTime.hours
    .toString()
    .padStart(2, "0")}.${closeTime.minutes.toString().padStart(2, "0")}`;
}

export {
  getCurrentTime,
  currentTime,
  isOpen,
  getTimeFromString,
  getOpenTime,
  getCloseTime
};
