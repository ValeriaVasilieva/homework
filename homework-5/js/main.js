const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: "#app",
  data: {
    catalogUrl: "/catalogData.json",
    products: [],
    filterProducts: [],
    cartProducts: [],
    userSearch: "",
    searchLine: "",
    showCart: false,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },
    addProduct(product) {
      this.cartProducts.map((cartProduct) => {
        if (cartProduct.id_product === product.id_product) {
          cartProduct.quantity++;
        }
      });
    },
    removeProduct(product) {
      this.cartProducts.map((cartProduct) => {
        if (cartProduct.id_product === product.id_product) {
          if (cartProduct.quantity > 1) {
            cartProduct.quantity--;
          } else {
            this.cartProducts.splice(this.cartProducts.indexOf(cartProduct), 1);
          }
        }
      });
    },
    filterGoods() {
      this.filterProducts = this.products.filter((product) =>
        product.product_name.toLowerCase().includes(this.searchLine)
      );
    },
  },
  mounted() {
    this.getJson(`${API + this.catalogUrl}`).then((data) => {
      for (let el of data) {
        this.products.push(el);
        this.filterProducts.push(el);
      }
    });
    this.getJson(`getProducts.json`).then((data) => {
      for (let item of data) {
        this.$data.products.push(item);
        this.$data.filtered.push(item);
      }
    });
    this.getJson(`${API + "/getBasket.json"}`).then((data) => {
      this.cartProducts = data.contents;
    });
  },
});
