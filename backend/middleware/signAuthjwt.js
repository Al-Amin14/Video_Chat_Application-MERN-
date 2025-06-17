import jwt from 'jsonwebtoken'
import users from '../models/users.js'
import mongoose from 'mongoose'

const hanldeUser = (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        req.status(422).json({ error: "Please give authentication" })
    } else {
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, process.env.jwt_secreat, (err, payload) => {
            if (err) {
                console.log(err)
                res.status(422).json({ error: "There is a problem in authorization" })
            } else {
                const { _id } = payload
                console.log(payload)
                users.findById(_id).then(saveuser => {
                    if (!saveuser) {
                        console.log(saveuser)
                        res.status(422).json({ error: "logout" })
                    } else {
                        req.users = saveuser
                        next()
                    }
                })
            }
        })
    }
}

export default hanldeUser   