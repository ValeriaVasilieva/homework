const products = [
  { id: 1, title: "Notebook", price: 2000 },
  { id: 2, title: "Mouse", price: 20 },
  { id: 3, title: "Keyboard", price: 200 },
  { id: 4, title: "Gamepad", price: 50 },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) =>
  `<div class="main__item">
        <img src="https://picsum.photos/200/300?random=${item.id}"></img>
        <div class="main__item-info">
            <h3>${item.title}</h3>
            <p class="main__price">${item.price}</p>
            <button class="main__button">Купить</button>
        </div>
    </div>`;

const renderPage = (list) => {
  const productsList = list.map((item) => renderProduct(item)).join("");
  console.log(productsList);
  document
    .querySelector(".main__products")
    .insertAdjacentHTML("afterbegin", productsList);
};

renderPage(products);
