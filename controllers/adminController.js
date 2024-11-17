import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const user = await adminModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no existente" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Credenciales erróneos" });
        }

       
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'Frase',
            { expiresIn: '10m' }
        );
        console.log("Se crea el token");

        res.json({ success: true, message: 'Login exitoso', token: token });
    } catch (error) {
        console.error('Login error', error);
        res.status(500).send('Error del servidor');
    }
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await adminModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Usuario ya existente" });
        }

       

       

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(username);
       
        console.log(password);
        const newUser = new adminModel({username,  password:hashedPassword });
        const savedUser = await newUser.save();
        console.log(password + ' hola')
        
        res.status(201).json({ success: true });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ success: false, message: "Error al registrar" });
    }
};


export {loginUser, registerUser};