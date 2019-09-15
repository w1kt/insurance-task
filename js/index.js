import products from './products.js';
import discountPolicies from './discountPolicies.js';
import Checkout from './Checkout.js';

const { homeInsurance, healthInsurance, carInsurance, petInsurance } = products;

const pricingRules = [
  // 3 for 2 deal.
  discountPolicies.ratioDiscount(carInsurance.sku, 3, 2),
  // Bulk discount deal
  discountPolicies.bulkDiscount(homeInsurance.sku, 4, 499.99),
  // Freebie deal
  discountPolicies.bundleFree(healthInsurance.sku, petInsurance.sku)
];

const co = new Checkout(pricingRules);

co.print('Scenario 1');
co.scan(carInsurance);
co.scan(carInsurance);
co.scan(carInsurance);
co.scan(petInsurance);
co.total();

co.clear();
co.print('Scenario 2');
co.scan(carInsurance);
co.scan(homeInsurance);
co.scan(homeInsurance);
co.scan(carInsurance);
co.scan(homeInsurance);
co.scan(homeInsurance);
co.scan(homeInsurance);
co.total();

co.clear();
co.print('Scenario 3');
co.scan(healthInsurance);
co.scan(petInsurance);
co.scan(homeInsurance);
co.total();
