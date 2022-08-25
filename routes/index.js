const { reset } = require("nodemon");
const User = require("../models/User");
const userRoute = require("../routes/user");
const authRoute = require("../routes/auth");
const productRoute = require("../routes/product");
const cartRoute = require("../routes/cart");
const orderRoute = require("../routes/order");
const stripeRoute = require("../routes/stripe");
const contactRoute = require("../routes/contact");

module.exports = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);
  app.use("/api/carts", cartRoute);
  app.use("/api/orders", orderRoute);
  app.use("/api/checkout", stripeRoute);
  app.use("/api/contact", contactRoute);

  // app.get("/", (req, res, next) => {
  //   res.send("<h1>All APIs</h1>");
  // });

  // // GET
  // app.get("/users", async (req, res, next) => {
  //   const allUsers = await User.find();
  //   // allUsers.map((doc) => doc.name).sort();
  //   res.send(allUsers);
  // });

  // // GET by ID
  // app.get("/users/:id", async (req, res, next) => {
  //   try {
  //     const post = await User.findOne({ _id: req.params.id });
  //     await res.send(post);
  //   } catch {
  //     res.status(404);
  //     res.send({ error: "User doesn't exist!" });
  //   }
  // });

  // // CREATE
  // app.post("/signup", async (req, res) => {
  //   try {
  //     const user = new User({
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: req.body.password,
  //     });
  //     User.findOne({ email: req.body.email }).then((existingUser) => {
  //       if (existingUser != null) {
  //         return res.status(422).json({ error: "User already exists!" });
  //       }
  //       user.save();
  //       res.send(user);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.send("Cannot create user!");
  //   }
  // });

  // // UPDATE
  // app.patch("/users/:id", async (req, res) => {
  //   try {
  //     const user = await User.findOne({ _id: req.params.id });

  //     if (req.body.password) {
  //       user.password = req.body.password;
  //     }

  //     if (req.body.email) {
  //       user.email = req.body.email;
  //     }

  //     console.log(req.body.email);
  //     console.log(req.body.password);
  //     await user.save();
  //     res.send(user);
  //   } catch {
  //     res.status(404);
  //     res.send({ error: "User doesn't exist!" });
  //   }
  // });

  // // DELETE
  // app.delete("/users/:id", async (req, res) => {
  //   try {
  //     await User.deleteOne({ _id: req.params.id });
  //     res.status(204).send("User deleted successfully!");
  //   } catch {
  //     res.status(404);
  //     res.send({ error: "User doesn't exist!" });
  //   }
  // });
};
