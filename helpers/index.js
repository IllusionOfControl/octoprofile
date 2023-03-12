const dictToArray = (dict, func = f => f) => {
  const array = []
  for (const key in dict) {
    array.push(func(key, dict[key]));
  }
  return array;
}

export {
  dictToArray,
}