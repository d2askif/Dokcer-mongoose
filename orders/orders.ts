const express = require("express");
const mongoose = require("mongoose");
import { OrderController } from "./Controller/OrderController";
import Order, { IOrder } from "./Order";
const bodyParser = require("body-parser");
import CoffeeApp from "./DependencyInversion/CoffeeApp";
import PremiumCoffeeMachine from "./DependencyInversion/PremiumCoffeeMachine";
import BasicCoffeeMachine from "./DependencyInversion/BasicCoffeeMachine";
import { throws } from "assert";

const makeFilterCoffee = new CoffeeApp(new BasicCoffeeMachine());
makeFilterCoffee.makeFilterCoffee();
const order = new Order();
const orderController = new OrderController(order);
const done = (err, data) => {
  if (err) {
    console.log("ERRor", err);
    return;
  }
  console.log("DATA", data);
};

mongoose.connect(
  "mongodb://daniel.shenkutie:ict4rd2012@ds211865.mlab.com:11865/gql-nenja",
  { useNewUrlParser: true },

  err => {
    console.log(err);

    console.log("db connected");
  }
);

const app = express();
app.use(bodyParser.json());

app.get("/orders", async (req, res) => {
  let requestData = req.body.data;

  let requestId = 0;
  console.log("Published a request message, requestId:", requestId);

  res.send("orders");
});

app.post("/new", (req, res) => {
  const newOrder: IOrder = {
    bookId: req.body.bookId,
    amount: req.body.amount
  };
  const order = orderController.createOrder(newOrder);
  order
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(er => {
      res.end("received POST request.");
    });
});

app.get("/order:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);

  const order = orderController.findOrderById(String(id));
});
app.get("/", (req, res) => {
  res.send("hi apit");
});

app.listen(3000, (req, res) => {
  console.log("db up");
});
