"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    bookId: { type: String, require: true }
});
const Order = mongoose_1.model("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map