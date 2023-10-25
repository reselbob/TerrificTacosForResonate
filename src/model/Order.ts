import {OrderItem} from "./OrderItem";
import {Customer} from "./Customer";
import {v4 as uuidv4} from 'uuid';
import {IOrder} from "./IOrder";

export class Order implements IOrder {
    readonly orderItems: OrderItem[]
    readonly customer: Customer;
    id: string;

    constructor(customer: Customer) {
        this.orderItems = new Array<OrderItem>()
        this.customer = customer;
        this.id = uuidv4();
    }

    add(orderItem: OrderItem): void {
        this.orderItems.push(orderItem);
    }
}
