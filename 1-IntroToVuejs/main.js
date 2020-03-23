var app = new Vue({
  el: '#app',
  data: {
    product: `Socks`,
    image: `./assets/vmSocks-blue-onWhite.jpg`,
    inventory: 9,
    details: ["80% cotton", "20% polyster", "Gender-neutral"],
    variants: [
      {
        variantId: 2214,
        variantColor: "Green",
      },
      {
        variantId: 2215,
        variantColor: "Blue",
      }
    ]
  }
})
