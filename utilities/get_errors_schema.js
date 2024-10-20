function getErrorSchema(err) {
  console.log(err);
  let keys = Object.keys(err.errors);
  let message = {};
  for (let i = 0; i < keys.length; i++) {
    message[keys[i]] = err.errors[keys[i]].message;
  }
  return message;
}
export default getErrorSchema;
