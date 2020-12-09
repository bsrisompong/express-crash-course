const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const uuid = require('uuid')

// Gets all Members
router.get('/', async (req, res) => {
  const members = await fetch(`https://jsonplaceholder.typicode.com/users`)
  // console.log(await members)
  res.send(await members.json())
  // res.json([object])
})

// :id is a URL parameter
router.get('/:id', async (req, res) => {
  const result = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const members = await result.json()
  const found = await members.find(
    (member) => member.id === parseInt(req.params.id)
  )
  if (found) res.json(found)
  else
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
})

// Create Member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  }

  if (!newMember.name || !newMember.email)
    return res.status(400).json({ msg: 'Please include a name and email' })

  // members.save(newMember) //MongoDB
  // members.push(newMember) // push new member object into members array

  //   res.json(newMember)
  res.redirect('/')
})

// Update Member
router.put('/:id', async (req, res) => {
  const result = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const members = await result.json()
  const found = await members.find(
    (member) => member.id === parseInt(req.params.id)
  )
  if (found) {
    const updMember = req.body
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name
        member.email = updMember.email ? updMember.email : member.email
      }
    })

    res.json({ msg: 'Member updated', updMember })
  } else
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
})

// Delete Member
router.delete('/:id', async (req, res) => {
  const result = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const members = await result.json()
  const found = await members.find(
    (member) => member.id === parseInt(req.params.id)
  )
  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter((member) => member.id !== found.id),
    })
  } else
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
})

module.exports = router
