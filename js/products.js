import insuranceTypes from "./insuranceTypes.js";
import Product from "./Product.js";

const products = {
  homeInsurance: new Product('homi', insuranceTypes.HomeInsurance, 549.99),
  healthInsurance: new Product('heai', insuranceTypes.HealthInsurance, 1399.99),
  carInsurance: new Product('cari', insuranceTypes.CarInsurance, 109.5),
  petInsurance: new Product('peti', insuranceTypes.PetInsurance, 30)
};
export default products;
