const mongoose = require('mongoose')

const { Schema } = mongoose

const ObjectId = mongoose.Schema.Types.ObjectId
const memberSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: {
    email: {
      type: String,
      unique: true,
      required: true,
      set: function (value) {
        return value.trim().toLowerCase();
      },
      validate: [
        function (email) {
          return (email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null)
        },
        'Invalid email'
      ]
    },
    phone: { type: String, required: true, minlength: 11 },
    address: { type: String, required: true }
  },
  dateOfBirth: { type: Date, required: true },
  sex: {
    type: String,
    required: true,
    enum: ['m', 'f']
  },
  department: {
    type: [String],
    default: [],
    enum: ['choir', 'ushering', 'media', 'service_admin', 'protocol', 'venue_management', 'clergy']
  },
  church: {
    type: String,
    required: true,
    set: function (value) {
      return value.trim().toLowerCase().replace(' ', '-')
    },
    get: function (value) {
      return value.replace('-', ' ')
    }
  },
  occupation: String,
  _createdBy: {
    creatorId: { type: ObjectId, ref: 'User', required: true }
  }
}, { timestamps: true })

memberSchema.static({
  getAllByDept: function (department, callback) {
    var members = this
    members.find({ department }, null, { sort: { _id: -1 } }, callback)
  },
  getAllByChurch: function (church, callback) {
    var members = this
    members.find({ church }, null, { sort: { _id: -1 } }, callback)
  }
})

memberSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })

module.exports = mongoose.model('Member', memberSchema)