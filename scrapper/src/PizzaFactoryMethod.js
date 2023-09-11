class Pizza {
  constructor(name) {
    this.name = name;
  }

  toTaste() {
    console.log(`Empty field`);
  }
}

class PizzaSarda extends Pizza {
  constructor() {
    super("Sarda");
    this.taste = `MMmmmm! pizza ${this.name} so nice, it's so smoked!`;
  }

  toTaste() {
    console.log(this.taste);
  }
}

export const pizzaSarda = new PizzaSarda();
