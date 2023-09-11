import "./App.css";
import { pizza4Cheese } from "./PizzaAbstractFactory";
import { pizzaPepperoni } from "./PizzaBuilder";
import { pizzaSarda } from "./PizzaFactoryMethod";

function App() {
  return <div className="App" />;
}

pizza4Cheese.toTaste();
pizzaSarda.toTaste();
pizzaPepperoni.toTaste();

export default App;
