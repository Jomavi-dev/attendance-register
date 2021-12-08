const router = require('express').Router()
const passport = require('passport')
require('../services/passport')

const {
  getAttendees,
  markAttendance
} = require('../controllers/attendance')

const jwtAuth = passport.authenticate('jwt', { session: false })

router.route('/')
  .all(jwtAuth)
  .get(getAttendees)
  .post(markAttendance)

module.exports = router