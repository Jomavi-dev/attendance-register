exports.getAttendees = (req, res) => {
  const { service, date } = req.query
  // const service = '6155e2fcbdca2044a9bc59dc'
  // const date = new Date("2021-09-30T16:19:02.307Z")
  req.models.Attendance.getMarkedAttendance(service, date, (error, attendance) => {
    if (error) return next(error)
    if (!attendance) return next(new Error('No attendance record found.'))
    res.status(200).json(attendance)
  })
}

exports.markAttendance = (req, res) => {
  const {
    marked,
    service,
  } = req.body

  const attendance = {
    marked,
    _service: service,
    _markedBy: req.user._id
  }

  const newAtendance = new req.models.Attendance(attendance)
  newAtendance.save((err, results) => {
    if (err) return next(err)
    res.status(201).json({
      message: {
        msgBody: 'Attendance created succesfully',
        msgError: false
      },
      doc: results
    })
  })
}