Vue.component("filter-elem", {
  data() {
    return {
      userSearch: "",
    };
  },
  template: `
      <form action="#" class="search-form">
        <input type="text" class="search-field" @input='$parent.filter(userSearch)' v-model='userSearch'/>
        <button type="submit" class="btn-search">
          <i class="fas fa-search"></i>
        </button>
      </form>
    `,
});

// $parent.$emit('remove', cartItem)
// @submit.prevent="$parent.filter()
