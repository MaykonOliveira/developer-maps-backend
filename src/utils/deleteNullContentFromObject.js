module.exports = function deleteNullContentFromObject(object) {
  newObject = { ...object };
  for (var key in newObject) {
    if (newObject[key] === null || newObject[key] === undefined) {
      delete newObject[key];
    }
  }

  return newObject;
};
