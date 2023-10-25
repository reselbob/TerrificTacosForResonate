import {IOrderItem} from "./IOrderItem";
import {IOrderStatus, Status} from "./IOrderStatus";
import {IOrder} from "./IOrder";
import {Customer} from "./Customer";
import {OrderItem} from "./OrderItem";
import {CreditCard} from "./CreditCard";

export class OrderStatus implements IOrderStatus {
    order: IOrder

    constructor(order: IOrder, status: Status) {
        this.order = order;
        this.id = this.order.id;
        this.orderItems = this.order.orderItems;
        this.customer  = this.order.customer;
        this.status = status
    }

    customer: Customer;
    id: string;
    orderItems: OrderItem[];
    readonly status: Status;

    add(orderItem: OrderItem): void {
        this.order.add(orderItem);
    }


}
