import {IOrder} from "./IOrder";

export enum Status {
    SUBMITTED = 1,
    STARTED = 2,
    FINISHED = 3,
    SERVED = 4,
    PAID = 5,
    COMPLETED,
    CLOSED = 7,
}

export interface IOrderStatus extends IOrder {
    readonly status: Status;
}
