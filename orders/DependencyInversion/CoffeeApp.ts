import { ICoffeeMachine } from "./CoffeeInterfaces";
class CoffeeApp {
  coffeeMachine: ICoffeeMachine;

  constructor(coffeeMachine: ICoffeeMachine) {
    this.coffeeMachine = coffeeMachine;
  }

  makeFilterCoffee() {
    this.coffeeMachine.brewFilterCoffee();
  }
}

export default CoffeeApp;
