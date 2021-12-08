exports.getMembers = (req, res) => {
  req.models.Member.find({}, null, { sort: { _id: -1 } }, (error, members) => {
    if (error) return next(error)
    if (!members) return next(new Error('No members found.'))
    res.status(200).json(members)
  });
}

exports.createMember = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    dateOfBirth,
    sex,
    department,
    church,
    occupation
  } = req.body

  const member = {
    firstName,
    lastName,
    contact: {
      email,
      phone,
      address
    },
    dateOfBirth,
    sex,
    department,
    church,
    occupation,
    _createdBy: {
      creatorId: req.user._id
    }
  }

  const newMember = new req.models.Member(member)
  newMember.save((err, results) => {
    if (err) return next(err)
    else
      return res.status(201).json({
        message: {
          msgBody: 'Member created succesfully',
          msgError: false
        },
        doc: results
      })
  })
}

exports.getMember = (req, res) => {
  // const member = { ...req.member._doc }
  // member.fullName = req.member.fullName
  res.status(200).json(req.member)
}

exports.deleteMember = (req, res) => {
  const { id } = req.params
  if (!id) return next(new Error('No member ID.'))
  req.models.Member.findByIdAndDelete(id)
    .then(() => res.json('Member deleted successfully.'))
    .catch(err => next(err))
}

exports.updateMember = (req, res) => {
  const { id } = req.params
  if (!id) return next(new Error('No member ID.'))
  req.models.Member.findById(id)
    .then(member => {
      const { firstName, lastName, email, phone, address, dateOfBirth, sex, department, church, occupation } = req.body

      if (firstName) member.firstName = firstName
      if (lastName) member.lastName = lastName
      if (email) member.contact.email = email
      if (phone) member.contact.phone = phone
      if (address) member.contact.address = address
      if (dateOfBirth) member.dateOfBirth = dateOfBirth
      if (sex) member.sex = sex
      if (department) member.department = department
      if (church) member.church = church
      if (occupation) member.occupation = occupation

      member.save((err, results) => {
        if (err) return next(err)
        else
          return res.status(201).json({
            message: {
              msgBody: 'Member updated succesfully.',
              msgError: false
            },
            doc: results
          })
      })
    })
    .catch(err => next(err))
}

exports.getDeptMembers = (req, res) => {
  const { department } = req.params
  if (!department) return next(new Error('No department specified.'))
  req.models.Member.getAllByDept(department, (error, members) => {
    if (error) return next(error)
    if (!members) return next(new Error('No members found.'))
    res.status(200).json(members)
  })
}

exports.getChurchMembers = (req, res) => {
  const { church } = req.params
  if (!church) return next(new Error('No church specified .'))
  req.models.Member.getAllByChurch(church, (error, members) => {
    if (error) return next(error)
    if (!members) return next(new Error('No members is not found.'))
    res.status(200).json(members)
  })
}