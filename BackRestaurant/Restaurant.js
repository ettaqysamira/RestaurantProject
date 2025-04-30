const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const authRoutes = require("./authRoutes.js");
const User = require("./userModel.js");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const cron = require('node-cron');






const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(express.json())
app.use("/auth", authRoutes);

app.use('/restoreImage', express.static('restoreImage'))

const MONGO_URI = "mongodb+srv://samiraettaqy:samiraMongoose@cluster0.njz9h.mongodb.net/BistroRestaurant?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connecté à MongoDB avec succès !")
    createAdminIfNotExists();
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
}))

const Order = mongoose.model('Order', new mongoose.Schema({
    items: [{
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    subtotal: Number, 
    tax: Number,
    discount: Number,
    total: Number,
    createdAt: { type: Date, default: Date.now }, 
    ticket: { type: Object, required: false }, 
    deliveryOption: { type: String, required: true },
    status: { 
        type: String, 
        enum: [ "en attente", "en préparation" ,"prêt à servir" , "livrée" , "annulée", "en cours", "payé"],
        default:"en attente"
    },
    livreurId: { type: String , default: null }, 

    
}))


const ReservationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    date: String,
    time: String,
    people: Number,
    preferences: String,
    status: { type: String, default: 'en attente' },
  });
  
  const Reservation = mongoose.model('Reservation', ReservationSchema);

// schema Livreur
const Livreur = mongoose.model('Livreur', new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
}));

app.post('/api/livreurs', async (req, res) => {
    const { nom, email, telephone } = req.body;

    try {
        const livreur = new Livreur({ nom, email, telephone });
        await livreur.save();
        res.status(201).json({ message: 'Livreur ajouté avec succès', livreur });
    } catch (error) {
        console.error("Erreur lors de l'ajout du livreur :", error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du livreur', details: error.message });
    }
});

app.get('/api/livreurs', async (req, res) => {
    try {
        const livreurs = await Livreur.find();
        res.status(200).json(livreurs);
    } catch (error) {
        console.error("Erreur lors de la récupération des livreurs :", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des livreurs' });
    }
})


app.put('/api/orders/:orderId/accept', async (req, res) => {
    const { orderId } = req.params;
    const { livreurId } = req.body;  

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        order.livreurId = livreurId;
        order.status = 'en cours';

        await order.save();

        res.json({ message: 'Commande acceptée', order });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'acceptation de la commande' });
    }
})


app.get('/api/orders/livreur/:livreurId', async (req, res) => {
    try {
        const orders = await Order.find({ livreurId: req.params.livreurId });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes pour ce livreur :", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes pour ce livreur' });
    }
})


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
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems)
    } catch (err) {
        console.error("Erreur lors de la récupération des plats :", err)
        res.status(500).json({ error: 'Erreur lors de la récupération des plats' })
    }
})

app.get('/api/menu/count', async (req, res) => {
    try {
        const count = await MenuItem.countDocuments()
        res.json({ count })
    } catch (error) {
        console.error("Erreur lors du comptage des plats :", error)
        res.status(500).json({ error: "Erreur serveur" })
    }
})

app.get('/api/orders/count', async (req, res) => {
    try {
       
        const totalCount = await Order.countDocuments()
        const preparationCount = await Order.countDocuments({ status: "en préparation" })
        res.json({ totalCount, preparationCount })
    } catch (error) {
        console.error("Erreur lors du comptage des commandes :", error)
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
      console.log("Données reçues :", req.body);
  
      const { items, discount = 10, taxRate = 0.2, deliveryOption, ticket } = req.body;
  
      if (!items || !deliveryOption || !ticket) {
        return res.status(400).json({ message: "Remplissez tous les champs" });
      }
  
      const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
      const tax = subtotal * taxRate;
      const total = subtotal + tax - discount;
  
      const newOrder = new Order({
        items,
        subtotal,
        tax,
        discount,
        total,
        deliveryOption,
        ticket, 
      })
  
      await newOrder.save();
  
      res.status(201).json({ message: "Commande créée avec succès", order: newOrder });
    } catch (error) {
      console.error("Erreur lors de la création de la commande :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  })
  




/*app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des commandes" })
    }
})*/
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
    }
});

app.get('/api/orders/caissier', async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [
                { deliveryOption: 'delivery', status: 'livrée' }, 
                { deliveryOption: 'takeout', status: 'prêt à servir' },
                { deliveryOption: 'dine-in', status: 'prêt à servir' } 
            ]
             });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
    }
});

app.get('/api/orders/encours', async (req, res) => {
    try {
        const orders = await Order.find({
            deliveryOption: "delivery",
            $or: [
                { status: "prêt à servir" },
                { status: "en cours" }  
            ]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
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



app.put('/api/orders/:id/status', async (req, res) => {
    const { status } = req.body;
  
    const validStatuses = ["en attente", "en préparation", "prêt à servir", "livrée", "annulée"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Statut invalide" })
    }
  
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Commande non trouvée" })
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json({ message: "Statut de la commande mis à jour", order })
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de la commande :", error)
      res.status(500).json({ error: "Erreur serveur lors de la mise à jour du statut" })
    }
  })
  

app.post('/api/users', async (req, res) => {
    const { name, email, password, role, isPredefined } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);  

        const newUser = new User({
            name,
            email,
            password: hashedPassword,  
            role,
            isPredefined,
        });

        await newUser.save();
        res.status(201).json({ message: "Utilisateur ajouté avec succès", user: newUser });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur lors de l'ajout de l'utilisateur", details: error.message });
    }
});
app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find({});
      
      res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
  })

app.get('/api/users/count', async (req, res) => {
	try {
		const totalUtilisateurs = await User.countDocuments();
		res.status(200).json({ totalUtilisateurs });
	} catch (error) {
		console.error("Erreur lors du comptage des utilisateurs :", error);
		res.status(500).json({ message: "Erreur serveur" });
	}
});

//dans caissier

app.put("/api/orders/:id/pay", async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, {
        status: "payé",
      }, { new: true });
  
      if (!updatedOrder) return res.status(404).json({ message: "Commande introuvable" });
  
      res.json(updatedOrder);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur", error: err });
    }
  })

  



const createAdminIfNotExists = async () => {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin1234", 10);
      const admin = new User({
        name: "Samira Admin",
        email: "ettaqysamira@admin.com",
        password: hashedPassword,
        role: "admin",
      });
      await admin.save();
      console.log("Administrateur créé automatiquement au démarrage.");
    } else {
      console.log("Un administrateur existe déjà.");
    }
  };


 
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'ettaqy.samira20@gmail.com', pass: 'yamo mbmk tbwf gvpm' },
  });
  
  app.post('/api/reservations', async (req, res) => {
    const conflict = await Reservation.findOne({ date: req.body.date, time: req.body.time });
    if (conflict) return res.status(400).json({ message: 'Créneau déjà réservé' });
  
    const reservation = new Reservation(req.body);
    await reservation.save();
  
    // Email de confirmation
    const mailOptions = {
      from: 'ettaqy.samira20@gmail.com',
      to: req.body.email,
      subject: 'Confirmation de réservation',
      text: `Bonjour ${req.body.name}, votre réservation pour ${req.body.date} à ${req.body.time} a été enregistrée.`,
    };
    transporter.sendMail(mailOptions);
  
    res.status(201).json(reservation);
  });
  
  app.get('/api/reservations', async (req, res) => {
    const reservations = await Reservation.find();
    res.json(reservations);
  });
  
  app.put('/api/reservations/:id', async (req, res) => {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
    if (req.body.status === 'confirmée') {
      const mailOptions = {
        from: 'ettaqy.samira20@gmail.com',
        to: reservation.email,
        subject: 'Votre réservation a été acceptée',
        text: `Bonjour ${reservation.name}, votre réservation pour le ${reservation.date} à ${reservation.time} a été acceptée. Merci et à bientôt !`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error('Erreur envoi email :', error);
        else console.log('Email envoyé :', info.response);
      });
    }
  
    res.json(reservation);
  });
  
  
  app.delete('/api/reservations/:id', async (req, res) => {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supprimé' });
  });




const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
