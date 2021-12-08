const router = require('express').Router()
const passport = require('passport')
require('../services/passport')

const {
  getMembers,
  createMember,
  getMember,
  deleteMember,
  updateMember,
  getDeptMembers,
  getChurchMembers
} = require('../controllers/member')

const jwtAuth = passport.authenticate('jwt', { session: false })

router.param('id', function (req, res, next, id) {
  if (!id) return next(new Error('No member ID.'))
  req.models.Member.findById(
    id,
    function (error, member) {
      if (error) return next(error)
      req.member = member
      return next()
    }
  )
})

router.route('/')
  .all(jwtAuth)
  .get(getMembers)
  .post(createMember)

router.route('/:id')
  .all(jwtAuth)
  .get(getMember)
  .delete(deleteMember)
  .patch(updateMember)

router.route('/department/:department')
  .all(jwtAuth)
  .get(getDeptMembers)

router.route('/church/:church')
  .all(jwtAuth)
  .get(getChurchMembers)

module.exports = router