import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cros from 'cors'
import bodyParser from 'body-parser'
import router from './routes/sugnup.js'
import alluser from './routes/allusers.js'
import dotenv from 'dotenv'
dotenv.config()
import { app, servre } from './socketserver/socketserver.js'


mongoose.connect(process.env.Mongo_Url)
mongoose.connection.on("connected", () => {
  console.log("Database connected")
})
mongoose.connection.on("error", () => {
  console.log(`error on ${process.env.Mongo_Url}`)
})


app.use(cros())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


app.use('/singlog', router)
app.use('/userall', alluser)

const port = 3000



servre.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})