import {OrderItem} from "./OrderItem";
import {Customer} from "./Customer";
import {CreditCard} from "./CreditCard";

export interface IOrder {
    orderItems: OrderItem[];
    customer: Customer;
    id: string;
    creditCard: CreditCard;

    add(orderItem: OrderItem): void;
}
