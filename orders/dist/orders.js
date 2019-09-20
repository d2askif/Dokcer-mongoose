"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const OrderController_1 = require("./Controller/OrderController");
const bodyParser = require("body-parser");
var amqp = require("amqplib");
const rabitMqConnectionString = process.env.CLOUDAMQP_URL;
const orderController = new OrderController_1.OrderController();
const done = (err, data) => {
    if (err) {
        console.log("ERRor", err);
        return;
    }
    console.log("DATA", data);
};
mongoose.connect("mongodb://daniel.shenkutie:ict4rd2012@ds211865.mlab.com:11865/gql-nenja", { useNewUrlParser: true }, err => {
    console.log(err);
    console.log("db connected");
});
const app = express();
app.use(bodyParser.json());
app.get("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield amqp.connect(rabitMqConnectionString);
    let channel = yield connection.createConfirmChannel();
    // publish the data to Rabbit MQ
    let requestData = req.body.data;
    let requestId = 0;
    console.log("Published a request message, requestId:", requestId);
    res.send("orders");
}));
app.post("/new", (req, res) => {
    const newOrder = {
        bookId: req.body.bookId,
        amount: req.body.amount
    };
    const order = orderController.createOrder(newOrder);
    order
        .then(data => {
        res.send(data.toJSON());
        console.log(data);
    })
        .catch(er => {
        res.end("received POST request.");
    });
});
app.get("/order:id", (req, res) => {
    console.log(req.params.id);
});
app.listen(3000, (req, res) => {
    console.log("db up");
});
//# sourceMappingURL=orders.js.map