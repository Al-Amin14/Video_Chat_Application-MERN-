import express from "express";
const router = express.Router()
import mongoose from "mongoose";
import users from "../models/users.js";
import handleUser from '../middleware/signAuthjwt.js'

router.get('/allusers', handleUser, (req, res) => {
    const { _id } = req.users
    users.find().then(result => {
        res.json(result)
    })
})

export default router