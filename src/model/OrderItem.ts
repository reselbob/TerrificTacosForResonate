import {IOrderItem} from "./IOrderItem";

export class OrderItem implements IOrderItem {
    constructor(readonly description: string, readonly price: number, readonly quantity: number) {}

    get total(): number {
        return this.price * this.quantity;
    }
}
