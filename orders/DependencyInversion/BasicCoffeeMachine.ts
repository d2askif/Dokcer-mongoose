import { ICoffeeMachine } from "./CoffeeInterfaces";

class BasicCoffeeMachine implements ICoffeeMachine {
  constructor() {}

  brewFilterCoffee() {
    console.log("filter coffee");
  }
}

export default BasicCoffeeMachine;
