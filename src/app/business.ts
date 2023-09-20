import {DB} from './db'
import {Context} from "../lib/Resonate";
import {tr} from "@faker-js/faker";

export interface IAccountEntry{
    account: string;
    amount: number;
}

export interface ITransfer{
    source: string;
    target: string;
    amount: number
}

export class Business{
    private db = DB.setup();

    public async updateAccount( context: Context<any>, accountEntry: IAccountEntry) {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT OR IGNORE INTO transfers (uuid, account, amount) VALUES (?, ?, ?)", [context.id, accountEntry.account, accountEntry.amount], function(err: any) {
                if (err) {
                    return reject(err);
                }
                resolve(context.idempotenceKey);
            });
        });
    };

    public async transferMoney(context: Context<any>, transfer: ITransfer) {
        if (transfer.source && transfer.target) {
            const source: IAccountEntry = {account: transfer.source, amount: transfer.amount * -1};
            const target: IAccountEntry = {account: transfer.target, amount: transfer.amount};

            let confSource = await context.newPromise(this.updateAccount, source);

            let confTarget = await context.newPromise(this.updateAccount, target);

            return [confSource, confTarget];
        } else{
            return [undefined, undefined]
        }

    }
}


