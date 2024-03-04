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
image.onload = () => {
    drawContext.drawImage(image, 0, 0)
}


