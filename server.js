import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

const app = express()
const PORT = 3000
app.use(express.static(path.resolve(__dirname,'./build')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.all('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'./build/index.html'))
})

const server = app.listen(PORT,() => {
    console.log(`Server running on port ${server.address().port}`)
})