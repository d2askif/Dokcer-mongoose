import { Document, Schema, Model, model } from "mongoose";
export interface IOrderModel extends IOrder, Document {}

interface IOrderInterface {
  createOrder(newOrder: IOrder): Promise<IOrder>;
  findOrderById(id: string): Promise<IOrder>;
}
export interface IOrder {
  amount: number;
  bookId: string;
}

class Order implements IOrderInterface {
  private _model: Model<IOrderModel>;
  constructor() {
    const schema: Schema = new Schema({
      amount: { type: Number, required: true },
      bookId: { type: String, require: true }
    });
    this._model = model<IOrderModel>("Order", schema);
  }

  public get model(): Model<IOrderModel> {
    return this._model;
  }

  async createOrder(newOrder: IOrder): Promise<IOrder> {
    try {
      console.log({ newOrder });

      const order = await this._model.create({ amount: 2, bookId: "23" });
      console.log({ order });

      return order;
    } catch (er) {
      console.log("here");

      throw er;
    }
  }

  async findOrderById(id: string): Promise<IOrder> {
    try {
      const order = this.model.findById(id);
      return order;
    } catch (er) {
      throw er;
    }
  }
}

//orderSchema.loadClass(OrderDoc);

//const Order = models.Order || model<IOrder>("Order", orderSchema);
export default Order;
