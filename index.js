const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = 823;
const canvasHeight = canvas.height = 800;

const ground = document.getElementById('ground');
const trees = document.getElementById('trees');
const bushes = document.getElementById('bushes');
const backgroundTrees = document.getElementById('background-trees');
const backgroundTrees2 = document.getElementById('background-trees2');

let x = 0;
let x2 = 823;
const moveSpeed = 5;

class layer{
    constructor(image, moveSpeed, y_Position){
        this.x = 0;
        this.y = y_Position;
        this.width = 823;
        this.height = 800;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = moveSpeed;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y);
        ctx.drawImage(this.image, this.x2, this.y);
    }
    update(){
        if(this.x < -823){
            this.x = 823 - this.speedModifier + this.x2;
        }else{
            this.x-=this.speedModifier ;
        }
        if(this.x2 < -823){
            this.x2 = 823 - this.speedModifier + this.x;
        }else{
            this.x2-=this.speedModifier ;
        }
    }
}

const groundLayer = new layer(ground, 2.5, 700);
const bushLayer = new layer(bushes, 2, 600);
const treeLayer = new layer(trees, 1.5, 0);
const backgroundTreesLayer = new layer (backgroundTrees, 1, 20);
const backgroundTrees2Layer = new layer (backgroundTrees2, 0.5, 0);

const gameObjects = [backgroundTrees2Layer, backgroundTreesLayer, treeLayer, groundLayer, bushLayer];

function animate(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
}
animate();