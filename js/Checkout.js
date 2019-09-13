class Checkout {
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.cart = [];
  }
  /**
   * Add a product to the cart.
   */
  scan(product) {
    if (!product) {
      return;
    }
    this.cart.push(product);
    this.print(`Scanning Product: ${product.sku} | ${product.name} | $${product.price}`);
  }
  /**
   * Calculate the total price of the cart.
   */
  total() {
    const totalDiscount = this.pricingRules.reduce((acc, currPolicy) => {
      return acc + currPolicy(this.cart);
    }, 0);
    const grossPrice = this.cart.reduce((acc, curr) => acc + curr.price, 0);
    const netPrice = grossPrice - totalDiscount;
    const netPriceFormatted = `$${netPrice.toFixed(2)}`;
    this.print(`Total Discount: $${totalDiscount}`);
    this.print(`Total Cost: ${netPriceFormatted}\n\n`);
    return netPriceFormatted;
  }
  /**
   * Clears the cart
   */
  clear() {
    this.cart = [];
  }
  /**
   * Prints text to the page
   */
  print(text) {
    let p = document.createElement('p');
    p.innerHTML = text;
    document.body.append(p);
  }
}
export default Checkout;
