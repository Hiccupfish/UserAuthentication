const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

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

// Register endpoint (optional: for testing)
app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

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

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
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
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});
