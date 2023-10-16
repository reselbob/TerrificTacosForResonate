import {ICreditCard} from "./ICreditCard";

export class CreditCard implements ICreditCard {
    constructor(readonly firstName: string, readonly lastName: string, readonly number: string) {}
}
