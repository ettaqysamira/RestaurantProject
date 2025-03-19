const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/restoreImage', express.static('restoreImage'));

const MONGO_URI = "mongodb+srv://samiraettaqy:samiraMongoose@cluster0.njz9h.mongodb.net/BistroRestaurant?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connecté à MongoDB avec succès !")
  })
  .catch(err => {
    console.error("Erreur de connexion à MongoDB :", err)
  })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'restoreImage/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

const MenuItem = mongoose.model('MenuItem', new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    price: Number,
    ingredients: [String],
    dietaryRestrictions: [String],
    allergens: [String],
    available: Boolean,
    image: String 
}));

const Order = mongoose.model('Order', new mongoose.Schema({
    items: [{
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    total: Number,
    createdAt: { type: Date, default: Date.now }, 
    ticket: { type: Object, required: false }, 
    deliveryOption: { type: String, required: true },
    
}))
app.post('/api/menu', upload.single('image'), (req, res) => {
    const price = parseFloat(req.body.price)
    
    if (isNaN(price)) {
        return res.status(400).json({ error: 'Prix invalide. Veuillez fournir un nombre.' })
    }
    

    const newMenuItem = new MenuItem({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        price: parseFloat(req.body.price),
        ingredients: req.body.ingredients ? req.body.ingredients.split(",").map(i => i.trim()) : [],
        dietaryRestrictions: req.body.dietaryRestrictions ? req.body.dietaryRestrictions.split(",").map(i => i.trim()) : [],
        allergens: req.body.allergens ? req.body.allergens.split(",").map(i => i.trim()) : [],
        available: req.body.available === 'true',
        image: req.file ? req.file.filename : null
    })

    newMenuItem.save()
        .then(() => res.status(201).json({ message: 'Plat ajouté avec succès !' }))
        .catch(err => {
            console.error("Erreur lors de l'ajout du plat :", err);
            res.status(500).json({ error: 'Erreur lors de l\'ajout du plat', details: err.message });
        })
})

app.get('/api/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find()
        res.status(200).json(menuItems)
    } catch (err) {
        console.error("Erreur lors de la récupération des plats :", err)
        res.status(500).json({ error: 'Erreur lors de la récupération des plats' })
    }
});

app.get('/api/menu/count', async (req, res) => {
    try {
        const count = await MenuItem.countDocuments()
        res.json({ count })
    } catch (error) {
        console.error("Erreur lors du comptage des plats :", error)
        res.status(500).json({ error: "Erreur serveur" })
    }
})

app.delete('/api/menu/:id', async (req, res) => {
    try {
        const result = await MenuItem.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({ error: "Plat non trouvé" })
        }
        res.json({ message: "Plat supprimé avec succès" })
    } catch (error) {
        console.error("Erreur lors de la suppression du plat :", error)
        res.status(500).json({ error: "Erreur serveur" })
    }
})

app.get('/api/menu/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ error: "Plat non trouvé" })
        }
        res.status(200).json(menuItem)
    } catch (err) {
        console.error("Erreur lors de la récupération du plat :", err)
        res.status(500).json({ error: 'Erreur lors de la récupération du plat' })
    }
})

app.put('/api/menu/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, type, description, price, ingredients, dietaryRestrictions, allergens, available } = req.body
        const updatedData = {
            name,
            type,
            description,
            price: parseFloat(price),
            ingredients: ingredients ? ingredients.split(",").map(i => i.trim()) : [],
            dietaryRestrictions: dietaryRestrictions ? dietaryRestrictions.split(",").map(i => i.trim()) : [],
            allergens: allergens ? allergens.split(",").map(i => i.trim()) : [],
            available: available === 'true',
        }

        if (req.file) {
            updatedData.image = req.file.filename
        }

        const result = await MenuItem.findByIdAndUpdate(req.params.id, updatedData, { new: true })

        if (!result) {
            return res.status(404).json({ error: "Plat non trouvé" })
        }
        res.json({ message: "Plat modifié avec succès", data: result })
    } catch (error) {
        console.error("Erreur lors de la modification du plat :", error)
        res.status(500).json({ error: "Erreur serveur" })
    }
})


app.post('/api/orders', async (req, res) => {
    try {
        const { items, total, ticket, deliveryOption } = req.body;

        if (!items || !total || !deliveryOption) {
            return res.status(400).json({ message: "Tous les champs requis ne sont pas fournis." })
        }

        const newOrder = new Order({ items, total, ticket, deliveryOption })
        await newOrder.save();
        res.status(201).json({ message: "Commande créée avec succès", order: newOrder })
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de la création de la commande.", error })
    }
})

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur lors de la récupération des commandes." })
    }
})

app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ error: "Commande non trouvée" })
        }
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur lors de la récupération de la commande." })
    }
})

app.delete('/api/orders/:id', async (req, res) => {
    try {
        const result = await Order.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({ error: "Commande non trouvée" })
        }
        res.json({ message: "Commande supprimée avec succès" })
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur lors de la suppression de la commande." })
    }
})

app.get('/api/orders/:id/ticket', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order || !order.ticket) {
            return res.status(404).json({ error: "Ticket non trouvé" })
        }
        res.status(200).json({ ticket: order.ticket })
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du ticket." })
    }
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
