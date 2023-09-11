class Pizza {
  name = null;
  vegetables = null;
  typeOfMeat = null;
  pieces = null;
  flavor = null;
  toTaste = null;
}

class Manual {
  constructor(name, vegetables, typeOfMeat, pieces, flavor) {
    this.name = name;
    this.vegetables = vegetables;
    this.typeOfMeat = typeOfMeat;
    this.pieces = pieces;
    this.flavor = flavor;
  }
}

class PizzaBuilder {
  pizza = {};

  static reset() {
    this.pizza = new Pizza();
  }
  static setComponents(manual) {
    this.pizza.name = manual.name;
    this.pizza.vegetables = manual.vegetables;
    this.pizza.typeOfMeat = manual.typeOfMeat;
    this.pizza.pieces = manual.pieces;
    this.pizza.flavor = manual.flavor;
  }

  static setToTaste() {
    this.pizza.taste = `MMmmmm! pizza ${this.pizza.name} so nice, it's so ${this.pizza.flavor}!`;
    this.pizza.toTaste = () => console.log(this.pizza.taste);
  }

  static getResult() {
    return this.pizza;
  }
}

class Director {
  static makePizza(manual) {
    PizzaBuilder.reset();
    PizzaBuilder.setComponents(manual);
    PizzaBuilder.setToTaste();
    return PizzaBuilder.getResult();
  }
}

const componentsForPepperoni = new Manual("Pepperoni", true, null, 8, "spicy");

export const pizzaPepperoni = Director.makePizza(componentsForPepperoni);
