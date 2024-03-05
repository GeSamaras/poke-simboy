const canvas = document.querySelector('canvas')
const drawContext = canvas.getContext('2d')


// hardcording the screen size for now
canvas.width = 1024
canvas.height = 576


const collisionsMap = []
for (let i = 0; i < collisions.length; i+= 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}


class Boundary {
    constructor({position}) {
        this.position = position
        this.width = 64 // map resolution is 400%
        this.height = 64 // so this should be 400% of 16px
    }
    draw() {
        drawContext.fillRect(this.position.x, this.position.y, this,width, this.height)
    }
}


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
        drawContext.drawImage(this.image, this.position.x, this.position.y)
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

    // changing the background coordenates for movement
    // adding/subtracting 3px per frame
    if (keys.w.pressed && lastKey === 'w') {
        background.position.y += 3
    } else if (keys.a.pressed && lastKey === 'a') {
        background.position.x += 3
    }   else if (keys.s.pressed && lastKey === 's') {
        background.position.y -= 3
    } else if (keys.d.pressed && lastKey === 'd') {
        background.position.x -= 3
    }
}

animate()

let lastKey = ''

// starting control keys for the canvas window
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
        break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
        break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break            
    }
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

