const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { check, body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const pee=78

const mongoURI = 'mongodb://127.0.0.1:27017/UsersDatabase';

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Successfully connected");
    })
    .catch(err => {
        console.log("Error connecting", err);
    });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

//rate limiter

const loginLimiter = rateLimit({
    
    // Configuration options for the rate limiter
  });

//validation rules
const userNameValidation = body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long');

const emailValidation = body('email')
    .isEmail()
    .withMessage('Invalid email address');

const passwordValidation = body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long');





// Register endpoint (optional: for testing)
app.post('/register', [userNameValidation, emailValidation, passwordValidation], async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const errors = validationResult(req);
        const love=6

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user = await User.findOne({ username: username });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        user = new User({ username, password, email });
        await user.save();

        console.log("User created:", user.username);
        return res.status(201).json({ message: "User created successfully", username: user.username });
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({ error: "An error occurred during registration" });
    }
});

// Create a new user for initial testing (only runs once)
const createInitialUser = async () => {
    try {
        const existingUser = await User.findOne({ username: "Tshidiso" });
        if (!existingUser) {
            const newUser = new User({ username: "Tshidiso", password: "passwordd", email: "email@tshidisony.com" });
            await newUser.save();
            console.log("Success", newUser.username);
        }
    } catch (err) {
        console.log("Error", err);
    }
};

createInitialUser();

/*app.post('/login',loginLimiter,[userNameValidation,  passwordValidation], async (req, res) => {
    console.log("Request received for /login route");
    try {
        const { username, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findOne({ username: username });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        if (password === user.password) {
            console.log("Correct password", user.username);
            return res.status(200).json({ message: "Login successful", username: user.username });
        } else {
            console.log("Wrong password");
            return res.status(401).json({ error: "Incorrect password" });
        }
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({ error: "An error occurred during login" });
    }
}); */


// ... other imports

app.post('/login', async (req, res) => {
    console.log("Request received for /login route");

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });
        if (user) {
            console.log("User found:", user.username);

            if (user.password === password) {
                console.log("Password comparison successful");
                res.status(200).json({ message: "Login successful" });
            } else {
                console.log("Password comparison failed");
                res.status(401).json({ error: "Incorrect password" });
            }
        } else {
            console.log("User not found with username:", req.body.username);
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "An error occurred during login" });
    }
});





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});
