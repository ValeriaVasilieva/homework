const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductList {
  constructor(container = ".main__products") {
    this.container = container;
    this.goods = [];
    this._getProducts().then((data) => {
      this.goods = data;
      this.render();
      console.log(data);
    });
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  getSum() {
    let sum = 0;
    for (let item of this.goods) {
      sum += item.price;
    }
    return sum;
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
    }
  }
}

class ProductItem {
  constructor(product, container = ".cart") {
    this.container = container;
    this.product = product;
    this.title = product.product_name;
    this.id = product.id_product;
    this.price = product.price;
  }

  render() {
    return `<div class="main__item">
         <img src="https://picsum.photos/200/300?random=${this.id}"></img>
         <div class="main__item-info">
             <h3>${this.title}</h3>
             <p class="main__price">${this.price}</p>
             <button class="main__button">Купить</button>
         </div>
     </div>`;
  }

//   async addToBasket() {
//     const block = document.querySelector(this.container);
//     const itemInBasket = new CartItem(this.product);
//     block.insertAdjacentHTML("beforeend", itemInBasket.render());

//     //   return await fetch(`${API}/addToBasket.json`, {
//     //     method: "POST",
//     //     data: JSON.stringify(product),
//     //   })
//     //     .then((result) => console.log(result.status))
//     //     .catch((error) => {
//     //       console.log(error);
//     //     });
//   }
}

class Cart {
  constructor(container = ".cart__content") {
    this.container = container;
    this.goods = [];
    this._clickCart();
    this._getCartItem().then((data) => {
      this.goods = [...data.contents];
      this.render();
    });
  }

  _clickCart() {
    document.querySelector(".cart__button").addEventListener("click", () => {
      document
        .querySelector(this.container)
        .classList.toggle("cart__visibility");
    });
  }

  _getCartItem() {
    return fetch(`${API}/getBasket.json`)
      .then((result) => result.json())
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.goods);
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new CartItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
    }
  }
}

class CartItem {
  constructor(product) {
    this.product = product;
    this.title = product.product_name;
    this.id = product.id_product;
    this.price = product.price;
    this.quantity = product.quantity;
  }

  render() {
    return `
    <div class="cart__item">
        <h3>${this.title}</h3>
        <p class="cart__price">${this.price}</p>
        <button class="cart__button cart__button--item">&#10008;</button>
     </div>`;
  }

  deleteItem() {}
  addItem() {}
}

let list = new ProductList();
let cart = new Cart();
