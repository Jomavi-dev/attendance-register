const mongoose = require('mongoose')

const { Schema } = mongoose

const ObjectId = mongoose.Schema.Types.ObjectId
const serviceSchema = new Schema({
  name: {
    type: String,
    required: [true, "You have to specify a name property"],
    unique: true
  },
  description: { type: String, default: null },
  active: { type: Boolean, default: false },
  _createdBy: {
    creatorId: { type: ObjectId, required: true },
    // church: { type: ObjectId, required: true }
  }
}, { timestamps: true })

serviceSchema.static({
  getActive: function (callback) {
    var services = this
    services.find({ active: true }, null, { sort: { _id: -1 } }, callback)
  }
})

module.exports = mongoose.model('Service', serviceSchema)