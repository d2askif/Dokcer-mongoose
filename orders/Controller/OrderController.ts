import Order, { IOrder } from "../Order";

interface IOrderController {
  createOrder(order: IOrder): Promise<IOrder>;
  findOrderById(id: string): Promise<IOrder>;
}

export class OrderController implements IOrderController {
  orderModel: Order;

  constructor(orderModel: Order) {
    this.orderModel = orderModel;
  }

  async createOrder(data: IOrder): Promise<IOrder> {
    console.log(data);

    try {
      const order: IOrder = await this.orderModel.createOrder(data);
      console.log(order);

      return order;
    } catch (er) {
      throw er;
    }
  }

  async findOrderById(id: string): Promise<IOrder> {
    try {
      const order: IOrder = await this.orderModel.findOrderById(id);
      return order;
    } catch (er) {
      throw er;
    }
  }
}
