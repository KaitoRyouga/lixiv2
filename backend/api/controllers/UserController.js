const User = require('../models/User')

class UserController {
  static async store (req, res, next) {
    try {
        if (!req.body.uid || !req.body.uid.trim().length) {
            return res.status(422).json({
                message: 'Uid is required!'
            })
        }

        let login = {
            displayName: req.body.displayName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            uid: req.body.uid,
            type: "user"
        }

        const checkUser = await User.findOne({uid: `${login.uid}`})
        try {
          if(checkUser === null){
            const newUser = new User(login)

            await newUser.save()
      
            return res.redirect('/')
          }else{
            return res.json("Not Found")
          }
        } catch (e) {
          console.log("not JSON");
          return res.json("Not Found")
        }

    } catch (error) {
      console.log(error)
      console.log('ERROR')
    }
  }

  static async index (req, res, next) {
    try {
      const UserIndex = await User.find({})

      return res.json({ User: UserIndex })
    } catch (error) {
      console.log(error)
      console.log('error')
    }
  }
}

module.exports = UserController
