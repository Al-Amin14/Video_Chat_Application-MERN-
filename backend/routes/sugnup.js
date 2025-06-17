import express from 'express'
const router = express.Router()
import mongoose from "mongoose";
import users from '../models/users.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

router.post('/sinup', (req, res) => {
    const { name, email, mobile, password } = req.body

    if (!name || !email || !mobile || !password) {
        req.json({ error: "There is problem" })
    } else {
        users.findOne({ $or: [{ email: email, name: name }] }).then(finduser => {
            if (finduser) {
                res.json({ error: "User all ready exists give unique email of name" })
            } else {
                bcrypt.hash(password, 12).then(hashpass => {
                    users.create({
                        name: name,
                        email: email,
                        mobile: mobile,
                        password: hashpass,
                    }).then(result => {
                        res.json("User created successfully")
                    }).catch(error => {
                        console.log(error)
                        res.status(422).json({ error: "Please try again with full potential😐" })
                    })
                })

            }
        })
    }
})

router.post('/login', (req, res) => {

    const { email, password } = req.body

    users.findOne({ email }).then(results => {
        if (!results) {
            res.json({ error: `There is no user ${email}` })
        } else {
            bcrypt.compare(password, results.password).then(result => {
                if (!result) {
                    res.status(422).json({ error: "There is a problem" })
                } else {
                    const token = jwt.sign({ _id: results._id }, process.env.jwt_secreat)
                    console.log(results._id)
                    res.json({ id: results._id, token: token })
                }
            })
        }
    })
})


export default router