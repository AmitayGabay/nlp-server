const { UserModel } = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretTokenWord } = require('../../config/secret')
const crypto = require('crypto')
const { authValid } = require("../validations/authValidation")
// const nodemailer = require('nodemailer')

//email sender details
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'udemiisrael@gmail.com',
//         pass: '75849239'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// })

exports.authCtrl = {
    signUp: async (req, res) => {
        try {
            let validation = authValid.signUp(req.body)
            if (validation.error)
                return res.json(validation.error.details)
            let user = await UserModel.findOne({ email: req.body.email })
            if (user) return res.status(400).json({ msg_err: "email already exists",code:11000 })
            let newUser = await UserModel.create(req.body)
            newUser.password = await bcrypt.hash(req.body.password, 10)
            newUser.emailToken = crypto.randomBytes(64).toString('hex')
            newUser.isVerified = false;
            await newUser.save()
            newUser.password = "******"
            //send verification mail to user
            // const mailOptions = {
            //     from: ' "verify your email" <udemiisrael@gmail.com>',
            //     to: newUser.email,
            //     subject: 'udemiisrael - verify your email',
            //     html: `<h2>${newUser.fullName.firstName}! thanks for registering on our site</h2>
            //             <h4>please verify your mail to continue...</h4>
            //             <a href="http://${req.headers.host}/user/verify-email?token=${newUser.emailToken}">verify your email</a>`
            // }
            //sending mail
            // transporter.sendMail(mailOptions,function(error,info){
            //     if(error){
            //         console.log(error)
            //     }
            //     else{
            //         console.log("verfiction mail sent to user")
            //     }
            // })

            return res.json({ msg: "user added" })
        }
        catch (err) {
            console.log(err)
        }
    },
    login: async (req, res) => {
        let validation = authValid.login(req.body)
        if (validation.error)
            return res.json(validation.error.details)
        let { email, password } = req.body
        try {
            let user = await UserModel.findOne({ email })
            if (!user) return res.json({ msg_err: "account not found",wrongEmail:true})
            if (await bcrypt.compare(password, user.password)) {
                let userData = { _id: user._id, role: user.role, firstName: user.fullName.firstName }
                return res.json({ token: jwt.sign({ userData }, secretTokenWord, { expiresIn: "300mins" }) })
            }
            else return res.status(400).json({ msg_err: "wrong password please try again",wrongPassword:true })
        }
        catch (err) {
            console.log(err)
        }
    }

}

