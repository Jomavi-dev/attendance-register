const router = require('express').Router()
const passport = require('passport')
require('../services/passport')

const {
  getServices,
  createService,
  getService,
  deleteService,
  updateService
} = require('../controllers/service')

const jwtAuth = passport.authenticate('jwt', { session: false })

router.param('id', function (req, res, next, id) {
  if (!id) return next(new Error('No service ID.'))
  console.log('id param was detected: ', id)
  req.models.User.findById(
    id,
    function (error, member) {
      if (error) return next(error);
      request.member = member;
      return next();
    }
  );
})

router.route('/')
  .all(jwtAuth)
  .get(getServices)
  .post(createService)

router.route('/:id')
  .all(jwtAuth)
  .get(getService)
  .delete(deleteService)
  .patch(updateService)

module.exports = router