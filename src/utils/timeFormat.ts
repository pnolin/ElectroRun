const elapsedTimeToString = (time: number) => {
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const remaining = time - totalSeconds * 1000;

  const secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;

  if (totalSeconds < 60) {
    return `${seconds}.${remaining}`;
  } else if (totalSeconds < 3600) {
    return `${minutes}:${secondsText}.${remaining}`;
  }

  return `${hours}:${minutesText}:${secondsText}.${remaining}`;
};

const stringToElapsedTime = (textValue: string) => {
  const splitted = textValue.split(":");

  if (splitted.length === 1) {
    return getMillisecondsSecondsAndRemaining(splitted[0]);
  } else if (splitted.length === 2) {
    return (
      getMillisecondsFromMinutes(splitted[0]) +
      getMillisecondsSecondsAndRemaining(splitted[1])
    );
  } else {
    return (
      getMillisecondsFromHours(splitted[0]) +
      getMillisecondsFromMinutes(splitted[1]) +
      getMillisecondsSecondsAndRemaining(splitted[2])
    );
  }
};

const getMillisecondsSecondsAndRemaining = (
  secondsAndRemainingText: string
) => {
  const secondsAndRemaining = secondsAndRemainingText.split(".");

  if (secondsAndRemaining.length === 1) {
    return 1000 * Number(secondsAndRemaining[0]);
  }

  return 1000 * Number(secondsAndRemaining[0]) + Number(secondsAndRemaining[1]);
};

const getMillisecondsFromMinutes = (minutesText: string) => {
  return Number(minutesText) * 60 * 1000;
};

const getMillisecondsFromHours = (hoursText: string) => {
  return Number(hoursText) * 60 * 60 * 1000;
};

export { elapsedTimeToString, stringToElapsedTime };
