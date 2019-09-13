import insuranceTypes from './insuranceTypes.js';
import products from './products.js';
import discountPolicies from './discountPolicies.js';
import Checkout from './Checkout.js';

const pricingRules = [
  // 3 for 2 deal.
  discountPolicies.ratioDiscount(insuranceTypes.CarInsurance, 3, 2),
  // Bulk discount deal 
  discountPolicies.bulkDiscount(insuranceTypes.HomeInsurance, 4, 499.99),
  // Freebie deal
  discountPolicies.bundleFree(
    insuranceTypes.HealthInsurance,
    insuranceTypes.PetInsurance
  )
];

const co = new Checkout(pricingRules);

co.print('Scenario 1');
co.scan(products.carInsurance);
co.scan(products.carInsurance);
co.scan(products.carInsurance);
co.scan(products.petInsurance);
co.total();

co.clear();
co.print('Scenario 2');
co.scan(products.carInsurance);
co.scan(products.homeInsurance);
co.scan(products.homeInsurance);
co.scan(products.carInsurance);
co.scan(products.homeInsurance);
co.scan(products.homeInsurance);
co.scan(products.homeInsurance);
co.total();

co.clear();
co.print('Scenario 3');
co.scan(products.healthInsurance);
co.scan(products.petInsurance);
co.scan(products.homeInsurance);
co.total();
