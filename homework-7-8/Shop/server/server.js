const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3003;
const handler = require("./handler");

app.use(express.json());
app.use("/", express.static("public"));

app.get("/api/products", (req, res) => {
  fs.readFile("server/db/products.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

app.get("/api/cart/", (req, res) => {
  fs.readFile("server/db/userCart.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

app.post("/api/cart/", (req, res) => {
  handler(req, res, "add", "server/db/userCart.json");
});

app.put("/api/cart/:id", (req, res) => {
  handler(req, res, "change", "server/db/userCart.json");
});

app.delete("/api/cart/:id", (req, res) => {
  handler(req, res, "remove", "server/db/userCart.json");
});

const port = process.env.PORT || PORT;
app.listen(port, () => console.log(`Listen on port ${port}...`));
