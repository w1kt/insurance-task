import Product from "./Product.js";

const products = {
  homeInsurance: new Product('homi', 'Home Insurance', 549.99),
  healthInsurance: new Product('heai', 'Health Insurance', 1399.99),
  carInsurance: new Product('cari', 'Car Insurance', 109.5),
  petInsurance: new Product('peti', 'Pet Insurance', 30)
};

export default products;
