const cartBox = document.querySelector(".cart-box");
const btns = document.querySelectorAll(".add-to-cart");
let itemsInCart = document.querySelectorAll(".cart-box__item");

for (let btn of btns) {
  btn.addEventListener("click", (e) => clickAddToCartkHandler(e));
}

function clickAddToCartkHandler(e) {
  e.preventDefault();
  const item = e.currentTarget.closest(".featured-items__box");
  const src = item.querySelector(".featured-items__img").getAttribute("src");
  const name = item.querySelector(".type-of-wear").textContent;
  const price = +item.querySelector(".price").textContent;
  const id = item.getAttribute("id");

  addPinkCounter();

  if (checkItemInCart(id)) {
    changeCountAndPrice(id);
  } else addNewItem(src, name, price, id);

  countTotal();
}

function countTotal() {
  const itemsInBox = document.querySelectorAll(".cart-box__item");
  const totalPriceBox = document.querySelector(".cart-box__total--before");
  const allCash = [];
  itemsInBox.forEach((item) => {
    const cash = item.querySelector(".item-price").textContent;
    allCash.push(cash);
  });
  let totalPrice = +allCash.reduce((total, cash) => +total + +cash);
  totalPriceBox.textContent = totalPrice.toFixed(2);
}

function addPinkCounter() {
  const counterCircle = document.querySelector(".count-circle");
  counterCircle.classList.remove("count-circle-none");
  let itemsNum = counterCircle.textContent;
  counterCircle.textContent = ++itemsNum;
}

function changeCountAndPrice(id) {
  const itemsInBox = document.querySelectorAll(".cart-box__item");
  itemsInBox.forEach((item) => {
    if (item.getAttribute("data-value") == id) {
      let price = item.querySelector(".item-price").textContent;
      let count = item.querySelector(".item-count").textContent;
      count = ++count;
      price = (price * count).toFixed(2);
      item.querySelector(".item-price").textContent = price;
      item.querySelector(".item-count").textContent = count;
    }
  });
}

function checkItemInCart(id) {
  const cartCollection = document
    .querySelector(".cart-box")
    .querySelectorAll(".cart-box__item");
  let arrOfId = [];

  if (cartCollection.length >= 1) {
    cartCollection.forEach((item) => {
      arrOfId.push(item.getAttribute("data-value"));
    });
  } else return;

  if (arrOfId.includes(id)) {
    return true;
  }
}

function addNewItem(src, name, price, id) {
  cartBox.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="cart-box__item" data-value=${id}>
      <img src=${src} alt=${name} class="cart-box__img">
      <div class="cart-box__info">
          <h4 class="cart-box__heading">${name}</h4>
          <p class="cart-box__price">
          <span class='item-count'>${1}</span>
          x
          <span class='item-price'>${price.toFixed(2)}</span>
          </p>
      </div>
      <img src="img/close.png" alt="close" class="cart-box__close">
    </div>
  `
  );
}
