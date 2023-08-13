const mongoose = require("mongoose");
const url = "mongodb+srv://admin-umair:test123@cluster0.xg387ne.mongodb.net/PisosDB";

const ConnectToMongo = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
        });
        console.log("DB Connection Successful");
    } catch (error) {
        console.log("Something went wrong Umair ! : ", error);
    }
};
module.exports = ConnectToMongo;
