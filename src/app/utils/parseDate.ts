function parseDate(stringDate: string) {
  if (!stringDate) return {time: '', date: ''};

  const d = new Date(stringDate);

  const hours = d.getHours() < 9 ? '0' + d.getHours() : d.getHours();
  const minutes = d.getMinutes() < 9 ? '0' + d.getMinutes() : d.getMinutes();
  const month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;

  const time = `${hours}:${minutes}`;
  const date = `${d.getDate()}-${month}-${d.getFullYear()}`;

  return {time, date};
}

export {parseDate};
