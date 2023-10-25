import {OrderItem} from "./OrderItem";
import {Customer} from "./Customer";

export interface IOrder {
    orderItems: OrderItem[];
    customer: Customer;
    id: string;
    add(orderItem: OrderItem): void;
}
