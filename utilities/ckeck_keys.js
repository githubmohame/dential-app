function checkKeys(list1, map1) {
  let res = [];
  for (let i = 0; i < list1.length; i++) {
    if (map1[list1[i]] == null) {
      res.push(list1[i]);
    }
  }
  return res;
}
export default checkKeys;
