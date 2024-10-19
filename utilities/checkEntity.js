export async function checkEntity(model, key, value) {
  let flage = await model.find({ key: value });
  if (flage) {
    return true;
  }
  return false;
}
