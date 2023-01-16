function random(): number {
  return Number(Math.random().toString().slice(2, 11));
}

export {random};
