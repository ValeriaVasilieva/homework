Vue.component("cart", {
  data() {
    return {
      cartItems: [],
      showCart: false,
    };
  },
  mounted() {
    this.$parent.getJson(`/api/cart`).then((data) => {
      data.map((item) => this.$data.cartItems.push(item));
    });
  },
  methods: {
    addProduct(item) {
      let find = this.cartItems.find((el) => el.id === item.id);
      if (find) {
        this.$parent
          .putJson(`/api/cart/${find.id}`, { quantity: 1 })
          .then((data) => {
            if (data.result === 1) {
              find.quantity++;
            }
          });
      } else {
        const prod = Object.assign({ quantity: 1 }, item);
        this.$parent.postJson(`/api/cart`, prod).then((data) => {
          if (data.result === 1) {
            this.cartItems.push(prod);
          }
        });
      }
    },
    deleteProduct(item) {
      if (item.quantity > 1) {
        this.$parent.putJson(`/api/cart/${item.id}`, item).then((data) => {
          if (data.result === 1) {
            item.quantity--;
          }
        });
      } else {
        this.$parent.deleteJson(`/api/cart/${item.id}`, item).then((data) => {
          console.log(data);
          this.cartItems = this.cartItems.filter((el) => el.id !== item.id);
        });
      }
    },
  },
  template: `
    <div class="cart">
      <a class="cart__button"
      ><img class="cart__button__img" src="img/Basket.png" alt="Cart"
      @click="showCart = !showCart"
      />
      </a>
      <div class="cart-box" v-show="showCart">

        <cart-item
          v-for="item of cartItems" 
          :key="item.id" 
          :cart-item="item"
          @remove="deleteProduct"
        ></cart-item>

        <div class="cart-box__total-box">
          <h2 class="cart-box__total">TOTAL</h2>
          <p class="cart-box__total">$500.00</p>
        </div>
        <a href="checkout.html" class="cart-box__button">Checkout</a>
        <a href="shoppingCart.html" class="cart-box__button"
          >Go to cart</a
        >
      </div>
    </div>
  `,
});

Vue.component("cart-item", {
  props: ["cartItem"],
  template: `<div class="cart-box__item">
      <img
        :src="cartItem.img"
        alt="man"
        class="cart-box__img"
      />
      <div class="cart-box__info">
        <h4 class="cart-box__heading">{{cartItem.title}}</h4>
        <p class="cart-box__price">{{cartItem.quantity}} x $ {{cartItem.price}}</p>
      </div>
      <a @click="$emit('remove', cartItem)" >
        <img
        src="img/close.png"
        alt="close"
        class="cart-box__close"
        />
      </a>
    </div>`,
});
