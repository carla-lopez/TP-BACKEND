const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Product = require("./models/product");
const productsRouter = express.Router();

mongoose.connect("mongodb://localhost/productDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

productsRouter
  .route("/")
  .get((req, res) => {
    Product.find({}, (err, products) => {
      if (err) {
        res.send(err);
      } else {
        res.json(products);
      }
    });
  })
  .post((req, res) => {
    const product = new Product({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status,
      stock: req.body.stock,
      category: req.body.category,
      thumbnails: req.body.thumbnails,
    });
    product
      .save()
      .then(() => {
        res.send("Producto agregado con éxito");
      })
      .catch((err) => {
        res.send(err);
      });
  });

cartsRouter.route("/:cid/product/:pid").post((req, res) => {
  Cart.find({ id: req.params.cid }, (err, carts) => {
    if (err) {
      res.send(err);
    } else {
      let cart = carts[0];
      let productIndex = cart.products.findIndex(
        (p) => p.product === req.params.pid
      );
      if (productIndex >= 0) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ product: req.params.pid, quantity: 1 });
      }
      cart.save((err, updatedCart) => {
        if (err) {
          res.send(err);
        } else {
          res.json(updatedCart);
        }
      });
    }
  });
});

cartsRouter.route("/:cid").get((req, res) => {
  Cart.find({ id: req.params.cid }, (err, carts) => {
    if (err) {
      res.send(err);
    } else {
      res.json(carts[0].products);
    }
  });
});

productsRouter
  .route("/:id")
  .get((req, res) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        res.send(err);
      } else {
        res.json(product);
      }
    });
  })
  .put((req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Producto actualizado con éxito");
      }
    });
  })
  .delete((req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, product) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Producto eliminado con éxito");
      }
    });
  });
cartsRouter
  .route("/")
  .get((req, res) => {
    Cart.find({}, (err, carts) => {
      if (err) {
        res.send(err);
      } else {
        res.json(carts);
      }
    });
  })
  .post((req, res) => {
    const cart = new Cart({
      id: req.body.id,
      products: req.body.products,
    });

    cart
      .save()
      .then(() => {
        res.send("Carrito agregado con éxito");
      })
      .catch((err) => {
        res.send(err);
      });
  });

app.use("/api/carts", cartsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
