const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

// in-memory data store
let store = {};
store.accounts = [];

// create an Express-app and apply middleware
let app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

// implement the http-methods to endpoints/routes
app.get('/accounts', (request, response) => {
    response.status(200).send(store.accounts) // result which is sent to the client is the entire accounts array
});

app.post('/accounts', (request, response) => {
    let newAccount = request.body;
    let id = store.accounts.length;
    store.accounts.push(newAccount);
    response.status(201).send({id: id})
    //response to the client will have the ID of the newly created account while the status is 201
});

app.put('/accounts/:id', (request, response) => {
    store.accounts[request.params.id] = request.body; //extract the id of the account that is being updated
    response.status(200).send(store.accounts[request.params.id]);
});

app.delete('/accounts/:id', (request, response) => {
    store.accounts.splice(request.params.id, 1); // use splice to remove an item from the data store array
    response.status(204).send()
});

app.listen(3000)

