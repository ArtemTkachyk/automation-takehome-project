class Components {
  constructor(name, flavor) {
    this.name = name;
    this.flavor = flavor;
    this.taste = `MMmmmm! pizza ${this.name} so nice, it's so ${this.flavor}!`;
  }
}

class Pizza {
  constructor(components) {
    this.components = components;
  }

  toTaste() {
    console.log(this.components.taste);
  }
}

const componentsFor4cheese = new Components("4cheese", "creamy");

export const pizza4Cheese = new Pizza(componentsFor4cheese);
