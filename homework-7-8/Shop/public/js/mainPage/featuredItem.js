Vue.component("feautered-items", {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.$parent.getJson(`/api/products`).then((data) => {
      data.map((item) => this.$data.products.push(item));
    });
  },
  template: `
              <div class="container">
                <div class="feautured-items__header">
                  <h1 class="paragraph">Featured Items</h1>
                    <p class="paragraph featured-items__discription">
                      Shop for items based on what we featured in this weak
                    </p>
                </div>
                <div class="featured-items__container">
                <product 
                  v-for="item of products" 
                  :key="item.id" 
                  :product="item"
                  @add-product="$parent.$refs.cart.addProduct"
                >
                </product>
                </>
              </div>
              </div>
                `,
});

Vue.component("product", {
  props: ["product"],
  template: `
      <div class="featured-items__box">
        <a href="single_page.html" class="featured-items__link">
          <img
            class="featured-items__img"
            :src="product.img"
            alt="t-shirt"
          />
          <div class="featured-items__info">
            <p class="text type-of-wear">{{product.title}}</p>
            <div class="price-box">
              <p class="price">{{product.price}}</p>
              <img class="stars" src="img/stars5.png" alt="stars" />
            </div>
          </div>
        </a>
        <div class="add-to-cart-box">
          <a class="add-to-cart" @click="$emit('add-product', product)">
            <img src="img/cart_white.png" alt="cart" />
            <p class="add-to-cart__text">Add to Cart</p>
          </a>
      </div>
    </div>
  `,
});
