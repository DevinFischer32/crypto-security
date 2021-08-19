const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const exisiting = bcrypt.compareSync(password, users[i].passwordHash)
        if (exisiting){
          let userLogin = {...users[i]}
          delete userLogin.passwordHash
          res.status(200).send(userLogin)
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const {username,email,firstName, lastName, password} = req.body
      const salt = bcrypt.genSaltSync(5)
      const passwordHash = bcrypt.hashSync(password, salt)

      let usersObj = {
        username,
        email,
        firstName,
        lastName,
        passwordHash
      }
      console.log(usersObj)
      users.push(usersObj)
      let userLogin = {...usersObj}
      delete userLogin.passwordHash
      res.status(200) 
      console.log('User Registered')
      return
      }
      
    }
    console.log(users)