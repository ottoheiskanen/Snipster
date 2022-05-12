const imgContainer = document.querySelector('.snip-container')

const input = document.querySelector('.take-snip')

let existingImages = [];
console.log(existingImages.length)

const takePicture = async () => {
    const url = 'http://localhost:3000/snip'
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(url, settings)
        return getSnip()
    } catch(e) {
        return console.log(e)
    }
}

const getSnip = async() => {
    try {
        const url = 'http://localhost:3000/image/:id'
        const response = await fetch(url)
        const data = await response.json()
        const dataUnit = data.snip
        const finalData = dataUnit.substring(1, dataUnit.length-1)
        imgContainer.src = finalData
    } catch(e) {
        return console.log(e)
    }
}

// const getRandom = async () => {
//         if (existingImages.length === 0) {
//             const url = 'http://localhost:3000/images'
//             const response = await fetch(url)
//             const data = await response.json()
//             for(let i=0; i<data.length; i++) {
//                 let dataUnit = data[i].snip
//                 let imageUnit = dataUnit.substring(1, dataUnit.length-1)
//                 existingImages.push(imageUnit)
//             }
//             //imgContainer.src = existingImages[Math.floor(Math.random() * existingImages.length-1)]
//             //const dataUnit = data[Math.floor(Math.random() * data.length-1)].snip
//             //let finalData = dataUnit.substring(1, dataUnit.length-1)
//         } else if(existingImages.length > 0) {
//             imgContainer.src = existingImages[Math.floor(Math.random() * existingImages.length-1)]
//         }    
// } 


window.addEventListener("keydown", (event) => {
    if(event.keyCode === 83) {
        return takePicture()
    }
    // if(event.keyCode === 86) {
    //     return getRandom()
    // }
    return event.preventDefault()
}) 