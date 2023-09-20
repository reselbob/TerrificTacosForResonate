import {ICommand} from "./ICommand";
import {ResonateServer} from './ResonateServer'
import {prototype} from "mocha";

export class Resonate<T> {
    private readonly resonateServer: ResonateServer;
    private readonly id: string;
    private rootContext: Context<T>;
    private functions:  { [key: string]: any } = {};

    constructor (href: string, id: string) {
        this.resonateServer = new ResonateServer(href);
        this.id = id;
        this.rootContext = new Context(this.resonateServer, this.id);
    }

    async registerFunction(func: Function, params: any): Promise<any> {
        if (typeof func !== 'function') {
            throw new Error("Expected a function for registration");
        }
        const functionName: string = func.name
        this.functions[functionName] = func;
        return await this.executeFunction(func, this.id, params);
        //return (this.id, params) => this.executeFunction(name, this.id, params);
    }

    async executeFunction(func: Function, id: string, params: any): Promise<any> {
        //const func = this.functions[functionName];
        //if (!func) {
            //throw new Error(`Function "${func..name}" is not registered.`);
        //}
        const asCommand = {functionName: func.name, args: params};
        const subContext = new Context(this.resonateServer, `${this.id}.${id}`, asCommand);
        return await subContext.bindToDurablePromise(func, params, 60 * 60 * 1000);
    }

    recover() {
        // Implementation or more detailed comment here
    }

}

export class Context<T> {
    private readonly resonateServer: ResonateServer;
    public readonly id: string;
    private no: number;
    public idempotenceKey: string;
    private asCommand: ICommand<T> | undefined;

    constructor(resonateServer: ResonateServer, id: string, asCommand?: ICommand<T>) {
        this.resonateServer = resonateServer;
        this.id = id;
        this.no = 0;
        this.idempotenceKey = this.id
        if (asCommand) this.asCommand = asCommand;
    }

    subContext() {
        return new Context(this.resonateServer, `${this.id}.${this.no++}`);
    }

    /**
     *
     * @param functions
     * @param functionName
     * @param args
     * @param timeout
     */
    public async newPromise(func: Function, args: T, timeout = (60 * 60 * 1000)) {
        return this.subContext().bindToDurablePromise(func, args, timeout);
    }


    async bindToDurablePromise(func: Function, args: T, timeout: number) {
        const asCommand: ICommand<T> = {functionName: func.name, args: args}

        const data = {
            ikey: this.id,
            data: asCommand
        };

        const createResponse = await this.resonateServer.createPromise(this.id, data, Date.now() + timeout);

        let resultPromise;

        if (createResponse.state === 'RESOLVED') {
            resultPromise = Promise.resolve(createResponse.value);
        } else if (createResponse.state === 'REJECTED') {
            resultPromise = Promise.reject(createResponse);
        } else {
            try {
                //const result = await this.functions[func..name](args);
                const result = await func(this, args);
                const resolveResponse = await this.resonateServer.resolvePromise(this.id, {ikey: this.id, data: result});
                resultPromise = Promise.resolve(resolveResponse.value);
            } catch (error) {
                await this.resonateServer.rejectPromise(this.id, {ikey: this.id, data: error});
                resultPromise = Promise.reject(error);
            }
        }

        return resultPromise
    }
}
