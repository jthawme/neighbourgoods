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
  if (current.day >= times.length) {
    return false;
  }

  const slot = times[current.day];

  const openTime = getTimeFromString(slot.open.time);
  const closeTime = getTimeFromString(slot.close.time);

  if (slot.close.day !== current.day) {
    return current.hours > openTime.hours;
  } else {
    return current.hours >= openTime.hours && current.hours <= closeTime.hours;
  }
}

function getOpenTime(times, current = currentTime) {
  if (current.day >= times.length) {
    return false;
  }

  const slot = times[current.day];
  const openTime = getTimeFromString(slot.open.time);

  if (currentTime.day === slot.open.day && current.hours > openTime.hours) {
    return getOpenTime(times, {
      ...current,
      day: (current.day + 1) % 7
    });
  }

  return `${openTime.hours
    .toString()
    .padStart(2, "0")}.${openTime.minutes.toString().padStart(2, "0")}${
    slot.open.day !== currentTime.day ? " (+1)" : ""
  }`;
}

function getCloseTime(times, current = currentTime) {
  if (current.day >= times.length) {
    return false;
  }

  const slot = times[current.day];
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
