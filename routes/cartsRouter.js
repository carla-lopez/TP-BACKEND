import {Router} from "express";

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

  cartsRouter.route("/").get((req, res) => {
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
}
  )

  export default cartsRouter