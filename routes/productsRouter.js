import {Router} from "express";

productsRouter.route("/").get((req, res) => {
 Product.find({}, (err, products) => {
 if (err) {
     res.send(err);
 } else {
     res.json(products);
 }
 });
}).post((req, res) => {
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
 product.save()
.then(() => {
     res.send("Producto agregado con éxito");
 })
 .catch((err) => {
     res.send(err);
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

  export default productsRouter