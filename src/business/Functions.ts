import {Logger} from "../logger";
import {Context} from "../lib/Resonate";
import {IOrder} from "../model/IOrder";
import {ICreditCard} from "../model/ICreditCard";
import {IOrderStatus, Status} from "../model/IOrderStatus";
import {OrderStatus} from "../model/OrderStatus";

let logger = new Logger()

async function submitOrder(context: Context<{ order : IOrder }>, param: { order : IOrder }): Promise<IOrderStatus> {
    logger.logInfo(`Beginning submitOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Executing submitOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Finished submitOrder for ${JSON.stringify(param.order)}`);

    return new OrderStatus(param.order, Status.SUBMITTED);

}
async function startOrder(context: Context<{  order : IOrder }>, param: {  order : IOrder}): Promise<IOrderStatus> {
    logger.logInfo(`Beginning startOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Executing startOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Finished startOrder for ${JSON.stringify(param.order)}`);

    return new OrderStatus(param.order, Status.STARTED);
}

async function finishOrder(context: Context<{  order : IOrder }>, param: {  order : IOrder  }): Promise<IOrderStatus> {
    logger.logInfo(`Beginning finishOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Executing finishOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Finished finishOrder for ${JSON.stringify(param.order)}`);

    return new OrderStatus(param.order, Status.FINISHED);
}

async function serveOrder(context: Context<{ order : IOrder, server: string  }>, param: { order : IOrder, server: string }): Promise<IOrderStatus> {
    logger.logInfo(`Beginning serveOrder for ${JSON.stringify(param.order)} by server ${param.server}`);
    logger.logInfo(`Executing serveOrder for ${JSON.stringify(param.order)} by server ${param.server}`);
    logger.logInfo(`Finished serveOrder for ${JSON.stringify(param.order)} by server ${param.server}`);

    return new OrderStatus(param.order, Status.SERVED);
}

async function payForOrder(context: Context<{ order : IOrder, creditCard: ICreditCard }>, param: { order : IOrder, creditCard: ICreditCard }): Promise<IOrderStatus> {
    logger.logInfo(`Beginning payForOrder for ${JSON.stringify(param.order)} with credit card:  ${JSON.stringify(param.creditCard)}`);
    logger.logInfo(`Executing payForOrder for ${JSON.stringify(param.order)} with credit card:  ${JSON.stringify(param.creditCard)}`);
    logger.logInfo(`Finished payForOrder for ${JSON.stringify(param.order)} with credit card:  ${JSON.stringify(param.creditCard)}`);

    return new OrderStatus(param.order, Status.PAID);
}

async function completeOrder(context: Context<{  order : IOrder }>, param: {  order : IOrder  }): Promise<IOrderStatus> {
    logger.logInfo(`Beginning completeOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Executing completeOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Finished completeOrder for ${JSON.stringify(param.order)}`);

    return new OrderStatus(param.order, Status.COMPLETED);
}

async function closeOrder(context: Context<{  order : IOrder }>, param: {  order : IOrder  }): Promise<IOrderStatus> {
    logger.logInfo(`Beginning closeOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Executing closeOrder for ${JSON.stringify(param.order)}`);
    logger.logInfo(`Finished closeOrder for ${JSON.stringify(param.order)}`);

    return new OrderStatus(param.order, Status.CLOSED);
}




export {submitOrder, startOrder, finishOrder, serveOrder, payForOrder, completeOrder, closeOrder }
