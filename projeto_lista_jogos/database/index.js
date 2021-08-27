const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/db_jogos", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

module.exports = mongoose;