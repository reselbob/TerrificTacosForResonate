import {OrderItem} from "./OrderItem";
import {Customer} from "./Customer";
import {CreditCard} from "./CreditCard";
import {v4 as uuidv4} from 'uuid';
import {IOrder} from "./IOrder";

export class Order implements IOrder {
    readonly orderItems: OrderItem[]
    readonly customer: Customer;
    id: string;
    readonly creditCard: CreditCard;

    constructor(customer: Customer, creditCard: CreditCard) {
        this.orderItems = new Array<OrderItem>()
        this.customer = customer;
        this.creditCard = creditCard;
        this.id = uuidv4();
    }

    add(orderItem: OrderItem): void {
        this.orderItems.push(orderItem);
    }
}
