import {Logger} from "../logger";
import {Context} from "../lib/Resonate";
import {IOrder} from "../model/IOrder";
import {ICreditCard} from "../model/ICreditCard";
import {IOrderStatus, Status} from "../model/IOrderStatus";
import {OrderStatus} from "../model/OrderStatus";

let logger = new Logger()

async function submitOrder(context: Context<{ order : IOrder }>, param: IOrder): Promise<IOrderStatus> {
    const myOrder = param as IOrder
    logger.logInfo(`Beginning submitOrder for ${param.id}`);
    logger.logInfo(`Executing submitOrder for ${param.id}`);
    logger.logInfo(`Finished submitOrder for ${param.id}`);

    return new OrderStatus(param, Status.SUBMITTED);

}
async function startOrder(context: Context<{  order : IOrder }>, param: IOrder): Promise<IOrderStatus> {
    logger.logInfo(`Beginning startOrder for ${param.id}`);
    logger.logInfo(`Executing startOrder for ${param.id}`);
    logger.logInfo(`Finished startOrder for ${param.id}`);

    return new OrderStatus(param, Status.STARTED);
}

async function finishOrder(context: Context<{ order : IOrder }>, param: IOrder): Promise<IOrderStatus> {
    logger.logInfo(`Beginning finishOrder for ${param.id}`);
    logger.logInfo(`Executing finishOrder for ${param.id}`);
    logger.logInfo(`Finished finishOrder for ${param.id}`);

    return new OrderStatus(param, Status.FINISHED);
}

async function serveOrder(context: Context<{ order : IOrder }>, param: IOrder): Promise<IOrderStatus> {
    logger.logInfo(`Beginning serveOrder for ${param.id}`);
    logger.logInfo(`Executing serveOrder for ${param.id}`);
    logger.logInfo(`Finished serveOrder for ${param.id}`);

    return new OrderStatus(param, Status.SERVED);
}

async function payForOrder(context: Context<{ order : IOrder, creditCard: ICreditCard }>, param: { order: IOrder, creditCard: ICreditCard}): Promise<IOrderStatus> {
    logger.logInfo(`Beginning payForOrder for ${param.order.id} with credit card:  ${param.creditCard.number}`);
    logger.logInfo(`Executing payForOrder for ${param.order.id} with credit card:  ${param.creditCard.number}`);
    logger.logInfo(`Finished payForOrder for ${param.order.id} with credit card:  ${param.creditCard.number}`);

    return new OrderStatus(param.order, Status.PAID);
}

async function completeOrder(context: Context<{ order : IOrder }>, param: IOrder): Promise<IOrderStatus> {
    logger.logInfo(`Beginning completeOrder for ${param.id}`);
    logger.logInfo(`Executing completeOrder for ${param.id}`);
    logger.logInfo(`Finished completeOrder for ${param.id}`);

    return new OrderStatus(param, Status.COMPLETED);
}

async function closeOrder(context: Context<{ order : IOrder }>, param: IOrder): Promise<IOrderStatus> {
    logger.logInfo(`Beginning closeOrder for ${param.id}`);
    logger.logInfo(`Executing closeOrder for ${param.id}`);
    logger.logInfo(`Finished closeOrder for ${param.id}`);

    return new OrderStatus(param, Status.CLOSED);
}

async function ping(context: Context<{ message : string }>, param: { message : string }): Promise<void> {
    logger.logInfo(`Starting ping for ${param.message}`);
    logger.logInfo(`Pinging ${param.message}}`);
    logger.logInfo(`Finished ping for ${param.message}`);
}

export {submitOrder, startOrder, finishOrder, serveOrder, payForOrder, completeOrder, closeOrder, ping }
