const app = require('./app');
const db = require('./config/user_db');
const UserModel = require('./model/user_model');
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


    
