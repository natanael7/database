const json = require("../../params.json");
const Customer = require("../customers/customers.dao.js");
class Summary {
  constructor(orders) {
    this.orderCount = orders.length;
    this.products = this.countProducts(orders);
    this.orderSum = this.sumIndex(orders, "sum");
    this.sumToCheckOut = this.sumIndex(orders, "realSum");
    this.averagePrice = Number((this.orderSum / this.orderCount).toFixed(2));
    // this.newCustomers = this.countNewCustomers(orders, customers);
    this.microProductsCount = this.countMicroProducts(orders);
    this.macroProductsCount = this.countMacroProducts();
    this.deliveryMethodCount = this.countIndex(orders, "deliveryMethod");
    this.payingMethodCount = this.countIndex(orders, "payingMethod");
    this.regionCount = this.countRegion(orders);
    this.chisinauCount = this.countChisinau(orders);
  }
  countIndex(arr, prop) {
    let obj = {};
    arr.forEach((el) => {
      if (obj[el[prop]] == undefined) obj[el[prop]] = 1;
      else obj[el[prop]]++;
    });
    return obj;
  }
  sumIndex(arr, prop) {
    let s = 0;
    arr.forEach((el) => {
      s += parseInt(el[prop]);
    });
    return s;
  }
  countNewCustomers(orders, customers) {
    let total = 0;
    let doubled = 0;
    orders.forEach((order) => {
      if (order.date == order.customer.date) total++;
    });
    customers.forEach((customer) => {
      customer.orders.forEach((order) => {
        if (order.date == customer.orders[0].date) doubled++;
      });
      doubled--;
    });
    return total - doubled;
  }
  countMacroProducts() {
    let categories = json.products;
    let counter = {};
    categories.forEach((category) => {
      counter[category.macro] = 0;
      category.micro.forEach((color) => {
        if (isNaN(this.microProductsCount[color]))
          this.microProductsCount[color] = 0;
        counter[category.macro] += this.microProductsCount[color];
      });
    });

    let obj = {};
    obj.Piepteni = this.microProductsCount.piep;
    if (isNaN(obj.Piepteni)) obj.Piepteni = 0;
    obj.Huse = this.microProductsCount.h;
    if (isNaN(obj.Huse)) obj.Huse = 0;
    obj.Sanitare = this.microProductsCount.cles + this.microProductsCount.bet;
    if (isNaN(obj.Sanitare)) obj.Sanitare = 0;
    obj.Periute = this.products - obj.Huse - obj.Piepteni - obj.Sanitare;
    for (const property in obj) {
      if (!obj[property]) delete obj[property];
    }
    return counter;
  }
  countMicroProducts(arr) {
    let obj = {};
    arr.forEach((order) => {
      if (order.productSet.length)
        order.productSet[0].forEach((product) => {
          if (Number.isInteger(parseInt(product.color)))
            product.color = "refurbished";
          if (obj[product.color] == undefined) obj[product.color] = 1;
          else obj[product.color]++;
        });
      else
        order.productSet.forEach((product) => {
          if (Number.isInteger(parseInt(product.color)))
            product.color = "refurbished";
          if (obj[product.color] == undefined) obj[product.color] = 1;
          else obj[product.color]++;
        });
    });

    return obj;
  }
  countRegion(arr) {
    let obj = {};
    arr.forEach((el) => {
      Customer.get({ _id: el["customer"] }, function (err, customers) {
        if (err) {
          res.json(`Error: ${err}`);
        }
        let k=0
        if (customers[0] == undefined) {
         
          if (customers["region"] == undefined) customers["region"] = 1;
          else customers["region"]++;
        }
        else { 
          if (customers[0]["region"] == undefined) customers[0]["region"] = 1;
          else customers[0]["region"]++;
        }
      });
    });
    return obj;
  }
  countChisinau(arr) {
    let obj = {};
    arr.forEach((el) => {
      if (el["customer"]["region"] == "chisinau") {
        if (obj[el["customer"]["city"]] == undefined)
          obj[el["customer"]["city"]] = 1;
        else obj[el["customer"]["city"]]++;
      }
    });
    return obj;
  }
  countProducts(arr) {
    let s = 0;
    let obj = this.countMicroProducts(arr);
    for (const property in obj) s += obj[property];
    return s;
  }
}
exports.Summary = Summary;
