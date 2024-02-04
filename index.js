window.addEventListener('load', function(){
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = 823;
const canvasHeight = canvas.height = 800;

//const capybara = document.getElementById('capybaras');
const ground = document.getElementById('ground');
const trees = document.getElementById('trees');
const bushes = document.getElementById('bushes');
const backgroundTrees = document.getElementById('background-trees');
const backgroundTrees2 = document.getElementById('background-trees2');

let isGrounded = true;


class InputHandler{
    constructor(game){
        this.game = game;
        window.addEventListener('keydown', e => {
            if((e.key === 'ArrowUp') && this.game.keys.indexOf(e.key) === -1){
                this.game.keys.push(e.key)
            }
            console.log(this.game.keys);
        });
        window.addEventListener('keyup', e =>{
            if(this.game.keys.indexOf(e.key) > -1){
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
            console.log(this.game.keys);
        })
    }
}

class Player{
    constructor(game){
        this.game = game;
        this.width = 336;
        this.height = 229;
        this.x=50;
        this.y=545;
        this.speedY = 0;
        this.maxSpeed = 15;
        this.fallSpeed = this.maxSpeed * 1.5;
        this.image = document.getElementById('capybara');
    }
    update(){
        if(this.game.keys.includes('ArrowUp') && this.y > 200 && isGrounded == true){
            this.speedY = -this.maxSpeed;
        }
        else if(this.y === 545) {
            this.speedY = 0;
            isGrounded = true;
        }
        else{
            this.speedY = this.maxSpeed;            
            isGrounded = false;
        }
        this.y += this.speedY;
    }
    draw(context){
        context.drawImage( this.image , this.x, this.y, this.width, this.height);
    }
}

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
        //player.draw(ctx);

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

const groundLayer = new layer(ground, 6.5, 700);
const bushLayer = new layer(bushes, 6, 600);
const treeLayer = new layer(trees, 5.5, 0);
const backgroundTreesLayer = new layer (backgroundTrees, 5, 20);
const backgroundTrees2Layer = new layer (backgroundTrees2, 4.5, 0);

const gameObjects = [backgroundTrees2Layer, backgroundTreesLayer, treeLayer, groundLayer, bushLayer];


class UI{

}

class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.keys = [];
    }
    update(){
        this.player.update();
    }
    draw(context){
        this.player.draw(context);
    }
}

const game = new Game(canvasWidth, canvasHeight);

function animate(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
}
animate();



});