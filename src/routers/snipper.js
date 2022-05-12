const express = require('express')
const Snip = require('../models/snip.js')
const router = new express.Router()
const Jimp = require("jimp")
const robot = require("robotjs")

//Use this variable to pass correct _id
let passableID;

//Robot and Jimp init
let base64
let jimg

//Screen capture processing
const getCapturedColors = (pixelColors,xPos, yPos, width, height) => {
    let img = robot.screen.capture(xPos, yPos, width, height)
    jimg = new Jimp(width, height) //let 

    for(let i=0; i<width; i++) {
        pixelColors[i] = []
        for(let j=0; j<height; j++) { 
            //robot
            let currentPixel = img.colorAt(i , j)        
            pixelColors[i][j] = currentPixel    //"#" +

            //jimp 
            let hex = pixelColors[i][j]
            let num = parseInt(hex+"ff",16)
            jimg.setPixelColor(num, i, j)
        }
    }
    jimg.getBase64(Jimp.AUTO, function(err, data) {
        base64 = data       
        //console.log(base64) 
    })
}

//Router actions
router.post('/snip' ,async (req, res) => {
    let pixelColors = []
    let mouse = robot.getMousePos()

    getCapturedColors(pixelColors, mouse.x, mouse.y, 300, 300)

    try {      
        let snip = new Snip({snip: JSON.stringify(base64)})
        snip.save()
        passableID = snip._id
        console.log(passableID) // Debug
        res.send()
    } catch(e) {
        res.status(400).send()
    }
})

router.get('/image/:id', async(req, res) => {
    try {
        let snip = await Snip.findOne({_id: passableID})
        res.send(snip)
    } catch(e) {
        res.status(404).send()
    }
})

// router.get('/images', async (req, res) => {
//     try {
//         const images = await Snip.find({})
//         res.status(201).send(images)
//     } catch(e) {
//         res.status(500).send()
//     }
// })

module.exports = router
