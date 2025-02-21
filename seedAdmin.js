const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB connected');

    // Создаем админа
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({ username: 'admin', password: hashedPassword, role: 'admin' });
        console.log('Админ создан: admin / admin123');
    } else {
        console.log('Админ уже есть');
    }

    // Создаем продавца
    const sellerExists = await User.findOne({ username: 'seller' });
    if (!sellerExists) {
        const hashedPassword = await bcrypt.hash('seller123', 10);
        await User.create({ username: 'seller', password: hashedPassword, role: 'seller' });
        console.log('Продавец создан: seller / seller123');
    } else {
        console.log('Продавец уже есть');
    }

    mongoose.disconnect();
}).catch(err => console.error('Ошибка подключения:', err));
