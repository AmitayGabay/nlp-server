const mongoose = require('mongoose');
const { mongoUserName, mongoPassword } = process.env;

const main = async () => {
    await mongoose.connect(`mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0.t0e15tv.mongodb.net/nlp`)
        .then(() => console.log("Mongo connection succeeded"))
        .catch((err) => console.error("Mongo connect fail. " + err));
};

main();
