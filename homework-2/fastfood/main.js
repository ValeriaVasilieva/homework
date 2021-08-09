class FastFood {
  constructor(
    containerProducts = ".form__products",
    containerTopings = ".form__topings"
  ) {
    this.containerProducts = containerProducts;
    this.containerTopings = containerTopings;
    this.products = [];
    this.topings = [];
    this.#fetchProduct();
    this.renderProducts();
    this.renderTopings();
  }

  #fetchProduct() {
    this.products = [
      { id: 1, title: "Маленький бургер", price: 50, calories: 20 },
      { id: 2, title: "Большой бургер", price: 110, calories: 40 },
    ];
    this.topings = [
      { id: 1, title: "Сыр", price: 10, calories: 20 },
      { id: 2, title: "Салат", price: 20, calories: 5 },
      { id: 3, title: "Картошка", price: 15, calories: 10 },
      { id: 4, title: "Приправа", price: 15, calories: 0 },
      { id: 5, title: "Майонез", price: 20, calories: 5 },
    ];
  }

  renderProducts() {
    const food = document.querySelector(this.containerProducts);
    this.products.map((product) => {
      const elem = new Product(product);
      food.insertAdjacentHTML("beforeend", elem.render());
    });
  }

  renderTopings() {
    const toping = document.querySelector(this.containerTopings);
    this.topings.map((item) => {
      const elem = new Topings(item);
      toping.insertAdjacentHTML("beforeend", elem.render());
    });
  }
}

class Product {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.calories = product.calories;
  }

  render() {
    return `
    <label>
      <input class='form__checkbox' type="checkbox" value=${this.title} data-calories=${this.calories} data-price=${this.price}>${this.title}
        <span name='product' class="form__price">${this.price} &#8381; / ${this.calories} ккал</span>
      </input>
    </label>
    `;
  }
}

class Topings {
  constructor(toping) {
    this.id = toping.id;
    this.title = toping.title;
    this.price = toping.price;
    this.calories = toping.calories;
  }

  render() {
    return `
    <label>
      <input name='toping' class='form__checkbox' type="checkbox" value=${this.title} data-calories=${this.calories} data-price=${this.price}>${this.title}
      <span class="form__price">${this.price} &#8381; / ${this.calories} ккал</span>
      </input>
    </label>
    `;
  }
}

let menu = new FastFood();

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  let checkedInputs = document.querySelectorAll(".form__checkbox:checked");

  if (document.querySelector('.result')) {
    document.querySelector('.result').remove()
  }

  let sumPrice = 0;
  let sumCal = 0;
  checkedInputs.forEach( item => {
    sumPrice += +item.dataset.price
    sumCal += +item.dataset.calories
  })
  const form = document.querySelector('.form');
  form.insertAdjacentHTML('afterend', `
    <p class="result">Стоимость заказа: ${sumPrice} &#8381;, каллорийность: ${sumCal} ккал</p>
  `)
});
