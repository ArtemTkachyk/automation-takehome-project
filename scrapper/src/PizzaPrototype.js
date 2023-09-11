class Pizza {
  constructor(taste) {
    this.taste = taste;
  }

  toTaste() {
    console.log(this.taste);
  }
}

export const pizzaHawaiian = new Pizza();
