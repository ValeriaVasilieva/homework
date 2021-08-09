class ProductList {
  constructor(container = ".main__products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts();
    this.render(); //вывод товаров на страницу
  }

  _fetchProducts() {
    this.goods = [
      { id: 1, title: "Notebook", price: 2000 },
      { id: 2, title: "Mouse", price: 20 },
      { id: 3, title: "Keyboard", price: 200 },
      { id: 4, title: "Gamepad", price: 50 },
    ];
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
  constructor(product) {
    this.title = product.title;
    this.id = product.id;
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
}

class Cart {
  render() {

  }
  open() {

  }
  close() {
    
  }
}

class CartItem {
  deleteItem() {

  }
  addItem() {

  }
}

let list = new ProductList();
console.log(list.getSum());
