const mongoose = require('mongoose')

const { Schema } = mongoose

const ObjectId = mongoose.Schema.Types.ObjectId
const attendanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  marked: { type: ObjectId, ref: 'Member', required: true },
  _service: { type: ObjectId, ref: 'Service', required: true },
  _markedBy: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

attendanceSchema.static({
  getMarkedAttendance: function (service, date, callback) {
    var attendance = this
    attendance.find({ _service: service, date }, null, { sort: { _id: -1 } }, callback)
  }
})

module.exports = mongoose.model('Attendance', attendanceSchema)