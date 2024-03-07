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
    static width = 64
    static height = 64
    constructor({position}) {
        this.position = position
        this.width = 64 // map resolution is 400%
        this.height = 64 // so this should be 400% of 16px
    }
    draw() {
        drawContext.fillStyle = 'rgba(255, 0, 0, 0.0)'
        drawContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


const boundaries = []

// putting the camera offset here
// so that the collisions map renders it in the proper position
const offset = {
    x: -100,
    y: -500
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 864)
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x ,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

console.log(boundaries)

// drawing images to the canvas, done through js' Image()
// instead of calling the src like in html
const image = new Image()
image.src = './tilesets/GameMap.png'

const playerImage = new Image()
playerImage.src = './tilesets/MaskFrog/SeparateAnim/Idle.png'


class Sprite {
    constructor({position, velocity, image, frames = {max: 1} }) {
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw() {
        drawContext.drawImage(
            this.image,
            // arguments for image croppping
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,       
            this.image.width / this.frames.max,
            this.image.height
            )
        }
    }
    
    


const player = new Sprite ({
    position: {
        x: canvas.width / 2 - 64 / 4 / 2,
        y: canvas.height / 2 - 16 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})


const background = new Sprite ({
    position: {
        x: offset.x,
        y: offset.y
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



// array to make items in the map moveable
// according to the player's movement
const movables = [background, ...boundaries]

// checks for player sprite to be hitting any of the four sides
// of the collision box
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x + rectangle1.position.x >= rectangle2.width &&
        rectangle1.position.y + rectangle1.position.y >= rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw() 
    

    let moving = true
    // changing the background coordenates for movement
    // adding/subtracting 3px per frame
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }     
       

    if (moving)
        movables.forEach((movable) => {
            movable.position.y += 3
        })
    }   else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }     
       

    if (moving)
        movables.forEach((movable) => {
            movable.position.x += 3
        })
    }    else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }     
       

    if (moving)
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }     
       

    if (moving)
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
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





