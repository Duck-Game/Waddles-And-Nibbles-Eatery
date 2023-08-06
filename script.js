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
loadSprite('bun', 'sprites/bread.png')
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
const duck = add([sprite('front-duck'), pos(200, 250), scale(2.5), area(), body(), 'waddles']);
const duck2 = add([sprite('front-duck'), pos(200, 168), scale(2.5), area(), body(), 'nibbles']);
const leftCounter = add([sprite('left-counter'), pos(450, 140), scale(1.3), area(), body({ isStatic: true })]);
const rightCounter = add([sprite('right-counter'), pos(800, 145), scale(1.3), area(), body({ isStatic: true })]);
const trashcan = add([sprite('trashcan'), pos(705, 165), scale(1.2), area(), body({ isStatic: true }), 'trash']);

const breadTable = add([sprite('bread-table'), pos(300, 500), scale(1.2), area(), body({ isStatic: true }), 'bun']);
const cheeseTable = add([sprite('cheese-table'), pos(500, 500), scale(1.2), area(), body({ isStatic: true }), 'cheese']);
const meatTable = add([sprite('meat-table'), pos(700, 500), scale(1.2), area(), body({ isStatic: true }), 'meat']);
const lettuceTable = add([sprite('lettuce-table'), pos(900, 500), scale(1.2), area(), body({ isStatic: true }), 'lettuce']);
const pepperTable = add([sprite('pepper-table'), pos(1100, 500), scale(1.2), area(), body({ isStatic: true }), 'peppers']);


//movement duck1

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

// movement duck 2

onKeyDown('d', () => {

  // how to change sprite
  // rat.use(sprite('cheese'))
  duck2.use(sprite('right-duck'))
  duck2.move(230, 0)
});

onKeyDown('a', () => {
  duck2.use(sprite('left-duck'))
  duck2.move(-230, 0)
});

onKeyDown('w', () => {
  duck2.use(sprite('back-duck'))
  duck2.move(0, -230)
});

onKeyDown('s', () => {
  duck2.use(sprite('front-duck'))
  duck2.move(0, 230)
});



// const cheese = add([sprite('cheese'), pos(300, 40), area(), body({ isStatic: true }), 'cheese']);


//random order function
let foods = ['cheese', 'meat', 'lettuce', 'peppers']

const randomArray = (length) => {
  let arr = ['bun'];

  for (let i = 1; i < length + 1; i++) {
    let randomNum = Math.floor(Math.random() * foods.length)
    arr.push(foods[randomNum])
  }
  arr.push('bun')
  return arr
}

let foodOrder;

//display food order function
const displayOrder = () => {
  foodOrder = randomArray(3);
  let positionY = 150
  for (let i = 0; i < foodOrder.length; i++) {
    add([sprite(foodOrder[i]), pos(350, positionY), scale(1.8)]);
    positionY += 70
  }
}

displayOrder()

let empty = ['cheese']
const duckContainer = []
let score = 0;

//score function whenever something collides
duck.onCollide("trash", () => {
  duckContainer.length = 0
  debug.log(score)
});

duck.onCollide("bun", () => {
  duckContainer.push("bun")
  debug.log(duckContainer)
})

duck.onCollide("cheese", () => {
  duckContainer.push("cheese")
  debug.log(duckContainer)
})

duck.onCollide("meat", () => {
  duckContainer.push("meat")
  debug.log(duckContainer)
})

duck.onCollide("lettuce", () => {
  duckContainer.push("lettuce")
  debug.log(duckContainer)
})

duck.onCollide("peppers", () => {
  duckContainer.push("peppers")
  debug.log(duckContainer)
})

//play Music 

loadSound("music", "sprites/music.mp3")

const music = play("music", {
  volume: 0.1,
  loop: true
})

onKeyPress("m", () => music.paused = !music.paused)

// hitting nibbles

loadSound("bonk", "sprites/bonk.mp3")

duck.onCollide('nibbles', () => {
  shake(10)
  addKaboom(duck2.pos)
  play("bonk")
  duck2.move(100, 0)
})

duck2.onCollide('waddles', () => {
  shake(10)
  addKaboom(duck2.pos)
  play("bonk")

})

let score1 = add([
  text(`Score: ${score}`, {
    font: 'arcade',
    size: 30
  }),
  pos(1200, 20),
  { value: 0 }
])

onUpdate(() => {
  let containerText = add([
    text(`${duckContainer}`, {
      font: 'arcade',
      size: 30
    }),
    pos(1200, 400),
    { value: 0 }
  ])
  duck.onCollide("trash", () => {
    containerText.text = ''
  });

  if (duckContainer.toString() === foodOrder.toString()) {
    score1.value++
    score1.text = `Score: ${score1.value}`
    duckContainer.length = 0
  }
  
})
