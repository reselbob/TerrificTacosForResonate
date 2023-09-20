import Joi from 'Joi'
import Express from 'express'
import {Resonate} from './lib/Resonate';
import {Business} from './app/business';
import bodyParser from "body-parser";

// Express Setup

const express = Express();

//express.use(Express.json());

express.use(bodyParser.json());

// Resonate Setup

const resonate = new Resonate("http://192.168.86.37:8001/", "myapp");

//const resonate = new Resonate<any>("http://localhost:8001/", "myapp");

const func = new Business()["transferMoney"]

const params = extractFunctionParameters(func);

resonate.registerFunction(func,params)
    .then( result => {
        console.log(result);

    }).catch(error => {
    console.log(error);
    })
    .then(() => {
        express.listen(8080, () => console.log(`Server running on port 8080`));
    })


express.post('/transfer/:id', async (req, res) => {

    const { id } = req.params;

    const schema = Joi.object({
        source: Joi.string().required(),
        target: Joi.string().required(),
        amount: Joi.number().required()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { source, target, amount } = value;

    try {
        let conf = await resonate.executeFunction(func, id, { source, target, amount });
        res.status(200).json({ message: conf });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }

});




function extractFunctionParameters(func: Function): string[] {
    // Use the Function.prototype.toString() method to get the function's source code
    const functionSource = func.toString();

    // Use a regular expression to extract the parameters
    const parameterMatch = functionSource.match(/\(([^)]*)\)/);

    if (parameterMatch && parameterMatch.length > 1) {
        // Split the parameters by commas and trim any extra whitespace
        const parameters = parameterMatch[1].split(',').map(param => param.trim());
        return parameters;
    } else {
        // If the regular expression doesn't match, return an empty array
        return [];
    }
}
