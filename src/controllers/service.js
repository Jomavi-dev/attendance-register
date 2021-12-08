exports.getServices = (req, res) => {
  req.models.getActive()
    .then(services => res.json(services))
    .catch(err => next(err))
}

exports.createService = (req, res) => {
  const {
    name,
    description,
    active
  } = req.body

  const service = {
    name,
    description,
    active,
    _createdBy: {
      creatorId: req.user._id
    }
  }

  const newService = new req.models.Service(service)
  newService.save((err, results) => {
    if (err) return next(err)
    else
      return res.status(201).json({
        message: {
          msgBody: 'Service created succesfully.',
          msgError: false
        },
        doc: results
      })
  })
}

exports.getService = (req, res) => {
  const { id } = req.params
  req.models.Service.findById(id)
    .then(service => res.json(service))
    .catch(err => next(err))
}

exports.deleteService = (req, res) => {
  const { id } = req.params
  req.models.Service.findByIdAndDelete(id)
    .then(() => res.json('Service deleted successfully.'))
    .catch(err => next(err))
}

exports.updateService = (req, res) => {
  const { id } = req.params
  req.models.Service.findById(id)
    .then(service => {
      const {
        name,
        description,
        active
      } = req.body
      if (name) exercise.name = name
      if (description) exercise.description = description
      if (active) exercise.active = active

      service.save()
        .then(() =>
          res.status(201).json({
            message: {
              msgBody: 'Member updated succesfully.',
              msgError: false
            },
            doc: results
          })
        )
        .catch(err => next(err))
    })
    .catch(err => next(err))
}