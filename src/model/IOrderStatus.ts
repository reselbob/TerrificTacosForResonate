import {IOrder} from "./IOrder";

enum OrderStatus {
    SUBMITTED = 1,
    STARTED = 2,
    FINISHED = 3,
    SERVED = 4,
    PAID = 5,
    CLOSED = 6,
}

export interface IOrderStatus extends IOrder {
    readonly status: OrderStatus;
}
