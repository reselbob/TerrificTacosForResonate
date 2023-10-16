import {ICustomer} from "./ICustomer";

export class Customer implements ICustomer {
    constructor(readonly firstName: string, readonly lastName: string, readonly email: string) {}
}
