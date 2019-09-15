/**
 * Gets a discount given an insurance type and some policy
 * @param {*} sku product to apply discount to
 * @param {*} cart Users cart,
 * @param {*} applyPolicy The policy function to apply
 */
const getDiscount = (sku, cart, applyPolicy) => {
  // Get info about the cart contents
  const relatedProducts = cart.filter(product => product.sku === sku);
  const boughtAmount = relatedProducts.length;
  if (!boughtAmount) {
    // User has not bought any of the insurance, return a discount of 0.
    return 0;
  }
  const matchedProductInfo = {
    products: relatedProducts,
    boughtAmount,
    price: relatedProducts[0].price
  };
  // Apply the policy with the gathered info
  const discount = applyPolicy(matchedProductInfo) || 0;
  return discount;
};

/**
 * Applies a discount as a ratio of two amounts
 * @param {*} sku product to apply discount to
 * @param {*} needAmount the amount a user needs to purchase for the policy to apply
 * @param {*} getAmount the amount of an insurance type the user will pay for after the discount
 */
const ratioDiscount = (sku, needAmount, getAmount) => cart => {
  const policy = info => {
    const discountMultiplier = needAmount - getAmount;
    if (info.boughtAmount >= needAmount) {
      return info.price * discountMultiplier;
    }
  };
  return getDiscount(sku, cart, policy);
};

/**
 * Applies a flat discount to all insurance of a type after a certain amount in cart is reached
 * @param {*} sku product to apply discount to
 * @param {*} needAmount Needed amount of an insurance type in cart before the discount applies
 * @param {*} discountedPrice The reduced price that will apply to the insurance type
 */
const bulkDiscount = (sku, needAmount, discountedPrice) => cart => {
  const policy = info => {
    if (info.boughtAmount > needAmount) {
      return (info.price - discountedPrice) * info.boughtAmount;
    }
  };
  return getDiscount(sku, cart, policy);
};

/**
 * Makes an insurance type free if another type exists in the cart
 * @param {*} sku product that must exist in the cart
 * @param {*} freeProductSku The freebie product
 */
const bundleFree = (sku, freeProductSku) => cart => {
  const policy = info => {
    const freeProducts = cart.filter(
      product => product.sku === freeProductSku
    );
    if (freeProducts.length) {
      const freeProductPrice = freeProducts[0].price;
      return freeProductPrice * freeProducts.length;
    }
  };
  return getDiscount(sku, cart, policy);
};

export default { ratioDiscount, bulkDiscount, bundleFree };
