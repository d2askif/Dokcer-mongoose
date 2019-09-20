import { ICoffeeMachine, IPremiumCoffeeMachine } from "./CoffeeInterfaces";
class PremiumCoffeeMachine implements ICoffeeMachine, IPremiumCoffeeMachine {
  constructor() {}

  brewFilterCoffee(): void {
    console.log(" brewFilterCoffee");
  }

  brewEspresso(): void {
    console.log("brewEspresso");
  }
}
export default PremiumCoffeeMachine;
