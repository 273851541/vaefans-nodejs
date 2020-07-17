const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/VaeFans',{ useNewUrlParser: true })

let db = mongoose.connection;
db.on('error',console.error.bind(console,'connections error'));
db.once('open',function () {
    console.log('db ok')
})
