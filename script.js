kaboom();

//Background image
loadSprite("background", 'sprites/bg.png');
add([
  sprite('background', { width: width(), height: height() }),
  scale(1)
])

//loading font
loadFont('arcade', 'ARCADECLASSIC.TTF')

//wall boundry
add([
  rect(width(), 2),
  area(),
  pos(0, 157),
  body({ isStatic: true }),
]);

//loading sprites
loadSprite('rat', 'rat.png');
loadSprite('left-counter', 'sprites/left-counter.png')
loadSprite('right-counter', 'sprites/right-counter.png')
loadSprite('trashcan', 'sprites/trashcan.png')
loadSprite('bread-table', 'sprites/bread-table.png')
loadSprite('cheese-table', 'sprites/cheese-table.png')
loadSprite('meat-table', 'sprites/meat-table.png')
loadSprite('lettuce-table', 'sprites/lettuce-table.png')
loadSprite('pepper-table', 'sprites/pepper-table.png')
loadSprite('bread', 'sprites/bread.png')
loadSprite('cheese', 'sprites/cheese.png')
loadSprite('meat', 'sprites/meat.png')
loadSprite('lettuce', 'sprites/lettuce.png')
loadSprite('peppers', 'sprites/peppers.png')
loadSprite('front-duck', 'sprites/front-duck.png')
loadSprite('back-duck', 'sprites/back-duck.png')
loadSprite('right-duck', 'sprites/right-duck.png')
loadSprite('left-duck', 'sprites/left-duck.png')


// loadSprite('cheese', 'cheese.png')

//setting sprite variables

// const rat = add([sprite('rat'), pos(80, 168), area(), body()]);
const duck = add([sprite('front-duck'), pos(80, 168),scale(2.5) ,area(), body()]);
const leftCounter = add([sprite('left-counter'), pos(450, 140), scale(1.3), area(), body({ isStatic: true })]);
const rightCounter = add([sprite('right-counter'), pos(800, 145), scale(1.3), area(), body({ isStatic: true })]);
const trashcan = add([sprite('trashcan'), pos(705, 165), scale(1.2), area(), body({ isStatic: true }), 'trash']);

const breadTable = add([sprite('bread-table'), pos(80, 200), scale(1.2), area(), body({ isStatic: true })]);
const cheeseTable = add([sprite('cheese-table'), pos(80, 250), scale(1.2), area(), body({ isStatic: true })]);
const meatTable = add([sprite('meat-table'), pos(90, 300), scale(1.2), area(), body({ isStatic: true })]);
const lettuceTable = add([sprite('lettuce-table'), pos(20, 350), scale(1.2), area(), body({ isStatic: true })]);
const pepperTable = add([sprite('pepper-table'), pos(50, 410), scale(1.2), area(), body({ isStatic: true })]);


//movement

onKeyDown('right', () => {
  
  // how to change sprite
  // rat.use(sprite('cheese'))
  duck.use(sprite('right-duck'))
  duck.move(230, 0)
});

onKeyDown('left', () => {
  duck.use(sprite('left-duck'))
  duck.move(-230, 0)
});

onKeyDown('up', () => {
  duck.use(sprite('back-duck'))
  duck.move(0, -230)
});

onKeyDown('down', () => {
  duck.use(sprite('front-duck'))
  duck.move(0, 230)
});



// const cheese = add([sprite('cheese'), pos(300, 40), area(), body({ isStatic: true }), 'cheese']);


//random order function
let foods = ['cheese', 'meat', 'lettuce', 'pepper']

const randomArray = (length) => {
  let arr = ['bun'];

  for (let i = 1; i < length; i++) {
    let randomNum = Math.floor(Math.random() * foods.length)
    arr.push(foods[randomNum])
  }
  arr.push('bun')
  return arr
}

const foodOrder = randomArray(4);

debug.log(foodOrder)


let empty = ['cheese']
const duckContainer = []
let score = 0;

//score function whenever something collides
duck.onCollide("trash", () => {
  duckContainer.push('cheese')
  if (duckContainer.toString() === empty.toString()) {
    score++
  }

  debug.log(score)
});

// debug.log(duckContainer)

//text example

// const score1 = add([
//   text("Score: 0", {
//     font: 'arcade',
//     size: 50
//   }),
//   pos().moveTo(rat.pos),
//   { value: 0 },
// ])

//play Music 

loadSound("music", "sprites/music.mp3")

const music = play("music", {
    volume: 0.1,
    loop: true
})

onKeyPress("space", () => music.paused = !music.paused)
// const playMusic = () => {
// 	music.play()
// }

// playMusic()

