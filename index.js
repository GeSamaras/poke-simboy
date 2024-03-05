const canvas = document.querySelector('canvas')
const drawContext = canvas.getContext('2d')

// hardcording the screen size for now
canvas.width = 1024
canvas.height = 576


drawContext.fillStyle = 'white'
drawContext.fillRect(0, 0, canvas.width, canvas.height)

// drawing images to the canvas, done through js' Image()
// instead of calling the src like in html
const image = new Image()
image.src = './tilesets/GameMap.png'

const playerImage = new Image()
playerImage.src = './tilesets/MaskFrog/SeparateAnim/Idle.png'


class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw() {
        drawContext.drawImage(this.image, -100, -500)
    }
}

const background = new Sprite ({
    position: {
        x: -100,
        y: -500
    },
    image: image
})


// since the image takes time to load, .onload handles
// the rendering async

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}


function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    drawContext.drawImage(playerImage,
        // arguments for image croppping
        0,
        0,
        playerImage.width / 4,
        playerImage.height,       
        // image positioning and centering
        canvas.width / 2 - playerImage.width / 4 / 2, 
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    )

}

animate()


// starting control keys for the canvas window
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
        break
        case 'a':
            keys.a.pressed = true
        break
        case 's':
            keys.s.pressed = true
        break
        case 'd':
            keys.d.pressed = true
        break            
    }
    console.log(keys)
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
        case 's':
            keys.s.pressed = false
        break
        case 'd':
            keys.d.pressed = false
        break            
    }
    console.log(keys)
})

