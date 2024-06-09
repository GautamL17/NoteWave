const mongoose = require('mongoose')

const monogoDB = async (URL) => {
    try {
        const result = await mongoose.connect(URL)
        console.log('MongoDB connected')
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = monogoDB