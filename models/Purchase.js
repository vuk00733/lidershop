const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
  ime: {
    type: String,
  },
  prezime: {
    type: String,
  },
  adresa: {
    type : String,
  },
 items: {
    type: String,
  },
  rdbr: {
    type: String,
  },
})

module.exports = mongoose.model('Purchase', purchaseSchema)
