
import express from 'express'
import productsRouter from './routes/productsRouter'
import cartsRouter from './routes/cartsRouter'

const express = require("express");

const port = 8080;
const app= express();
const mongoose = require("mongoose");

const productsRouter = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://productDB:<Orion0077>@cluster0.dhe2eb7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
})
app.use("/api/carts", cartsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


