import supertest from 'supertest';
import * as assert from 'assert';
import { v4 as uuidv4 } from 'uuid';
import { app, stopServer } from '../src/index';
import {Randomizer} from "../src/helper/Randomizer";
import {ICustomer} from "../src/model/ICustomer";
import {IOrder} from "../src/model/IOrder";
import {ICreditCard} from "../src/model/ICreditCard"; // Assuming your server setup is in this file

describe('Workflow Tests', () => {
    let server: supertest.SuperTest<supertest.Test>;
    let customer: ICustomer;
    let order: IOrder;
    let creditCard: ICreditCard

    before(() => {
        server = supertest(app);
        customer = Randomizer.getCustomer();
        order = Randomizer.getOrder(customer, 2);
        creditCard = Randomizer.getCreditCard(customer);
    });

    after((done) => {
        // Assuming your server object has a method to gracefully shut down
        // If not, you might need to modify it accordingly
        stopServer();
        done();
    });

    it('Can submit order', async () => {
        const ikey = uuidv4();
        const myUrl = `/submitOrder/${ikey}`
        const response = await server
            .post(myUrl)
            .send(order)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message.ikey.includes(ikey), true);
    });

    it('Can startOrder', async () => {
        const ikey = uuidv4();
        const myUrl = `/startOrder/${ikey}`
        const response = await server
            .post(myUrl)
            .send(order)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message.ikey.includes(ikey), true);
    });

    it('Can serveOrder', async () => {
        const ikey = uuidv4();
        const myUrl = `/serveOrder/${ikey}`
        const response = await server
            .post(myUrl)
            .send(order)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message.ikey.includes(ikey), true);
    });

    it('Can payForOrder', async () => {
        const ikey = uuidv4();
        const myUrl = `/payForOrder/${ikey}`
        const response = await server
            .post(myUrl)
            .send({order,creditCard})
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message.ikey.includes(ikey), true);
    });

    it('Can finishOrder', async () => {
        const ikey = uuidv4();
        const myUrl = `/finishOrder/${ikey}`
        const response = await server
            .post(myUrl)
            .send(order)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message.ikey.includes(ikey), true);
    });

    it('Can completeOrder', async () => {
        const ikey = uuidv4();
        const myUrl = `/completeOrder/${ikey}`
        const response = await server
            .post(myUrl)
            .send(order)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message.ikey.includes(ikey), true);
    });

    it('Can closeOrder', async () => {
        const ikey = uuidv4();
        const myUrl = `/closeOrder/${ikey}`
        const response = await server
            .post(myUrl)
            .send(order)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message.ikey.includes(ikey), true);
    });

    it('should respond to able to ping', async () => {
        const ikey = uuidv4()
        const myUrl = `/ping/${ikey}`
        const response = await server
            .post(myUrl)
            .send({
                message: 'Bob',
            })
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message.ikey.includes(ikey), true);
    });

});
