const express = require("express");
require("./db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Product = require("./models/Product");
const User = require("./models/User");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());


// ================= PRODUCT ROUTES =================

// Get All Products
app.get("/product", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// Add Product
app.post("/product", async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.json({
            message: "Product Added",
            product
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// Update Product
app.put("/product/:id", async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product Updated",
            product
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// Delete Product
app.delete("/product/:id", async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product Deleted"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// ================= AUTH ROUTES =================

// Register
app.post("/register", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.json({
            message: "User Registered Successfully",
            user: newUser
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
});


// Login
app.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: foundUser._id
            },
            "mysecretkey",
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successfully",
            token
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
});

// protected route
app.get("/profile", auth, (req, res) => {
    res.json({
        message: "Welcome User",
        userId: req.user.id
    });
});


// ================= SERVER =================

app.listen(5000, () => {
    console.log("Server running on port 5000");
});