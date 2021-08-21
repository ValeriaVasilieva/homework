let add = (cart, req) => {
  cart.push(req.body);
  return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
  let find = cart.find((el) => el.id === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};
let remove = (cart, req) => {
  let newCart = cart.filter((el) => el.id !== +req.params.id);
  return JSON.stringify(newCart, null, 4);
};

module.exports = {
  add,
  change,
  remove,
};
