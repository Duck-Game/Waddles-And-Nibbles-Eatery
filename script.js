kaboom();

//Background image
loadSprite("background", 'sprites/bg.png');

//loading font
loadFont('arcade', 'ARCADECLASSIC.TTF')

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

//setting game player 1

scene('player1', () => {

  //setting background
  add([
    sprite('background', { width: width(), height: height() }),
    scale(1)
  ])

  //wall boundry
  add([
    rect(width(), 2),
    area(),
    pos(0, 157),
    body({ isStatic: true }),
  ]);

  //setting sprite variables
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

  //movement
  const SPEED = 330
  onKeyDown('right', () => {
    duck.use(sprite('right-duck'))
    duck.move(SPEED, 0)
  });

  onKeyDown('left', () => {
    duck.use(sprite('left-duck'))
    duck.move(-SPEED, 0)
  });

  onKeyDown('up', () => {
    duck.use(sprite('back-duck'))
    duck.move(0, -SPEED)
  });

  onKeyDown('down', () => {
    duck.use(sprite('front-duck'))
    duck.move(0, SPEED)
  });

  // movement duck 2

  onKeyDown('d', () => {
    duck2.use(sprite('right-duck'))
    duck2.move(SPEED, 0)
  });

  onKeyDown('a', () => {
    duck2.use(sprite('left-duck'))
    duck2.move(-SPEED, 0)
  });

  onKeyDown('w', () => {
    duck2.use(sprite('back-duck'))
    duck2.move(0, -SPEED)
  });

  onKeyDown('s', () => {
    duck2.use(sprite('front-duck'))
    duck2.move(0, SPEED)
  });

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

  const duckContainer = []
  const duckSprites = []
  let duckContainerPos = 150

  const resetDuckSprites = () => {
    for (let i = 0; i < duckSprites.length; i++) {
      destroy(duckSprites[i])
    }
    duckContainerPos = 150
  }

  //deleting items from array
  duck.onCollide("trash", () => {
    duckContainer.length = 0
    resetDuckSprites()
    shake(2.6)
    time -= 10
  });

  //collecting items and storing in array
  duck.onCollide("bun", () => {
    duckContainer.push("bun")
    duckSprites.push(add([sprite('bun'), pos(1150, duckContainerPos), scale(1.5)]))
    duckContainerPos += 70
  })

  duck.onCollide("cheese", () => {
    duckContainer.push("cheese")
    duckSprites.push(add([sprite('cheese'), pos(1150, duckContainerPos), scale(1.5)]))
    duckContainerPos += 70
  })

  duck.onCollide("meat", () => {
    duckContainer.push("meat")
    duckSprites.push(add([sprite('meat'), pos(1150, duckContainerPos), scale(1.5)]))
    duckContainerPos += 70
  })

  duck.onCollide("lettuce", () => {
    duckContainer.push("lettuce")
    duckSprites.push(add([sprite('lettuce'), pos(1150, duckContainerPos), scale(1.5)]))
    duckContainerPos += 70
  })

  duck.onCollide("peppers", () => {
    duckContainer.push("peppers")
    duckSprites.push(add([sprite('peppers'), pos(1150, duckContainerPos), scale(1.5)]))
    duckContainerPos += 70
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

  //score text
  let score1 = add([
    text(`Score: 0`, {
      font: 'arcade',
      size: 30
    }),
    pos(1200, 20),
    { value: 0 }
  ])

  //creating food array order
  let foodOrder = randomArray(3);
  let spriteArr = []
  let orderPosition = 150
  for (let i = 0; i < foodOrder.length; i++) {
    spriteArr.push(add([sprite(foodOrder[i]), pos(350, orderPosition), scale(1.8)]))
    orderPosition += 70
  }
  //function to destroy then recreate order
  const orderUpdate = () => {
    destroy(spriteArr[1])
    destroy(spriteArr[2])
    destroy(spriteArr[3])

    foodOrder = randomArray(3)
    orderPosition = 220
    for (let i = 1; i < foodOrder.length - 1; i++) {
      spriteArr[i] = (add([sprite(foodOrder[i]), pos(350, orderPosition), scale(1.8)]))
      orderPosition += 70
    }
  }


  //timer function
  let time = 30;

  let timer = add([
    text(`0:${time}`, {
      font: 'arcade',
      size: 30
    }),
    pos(700, 20),
  ])

  const lowerTimer = () => {
    time >= 10 ? timer.text = `0:${time}` : timer.text = `0:0${time}`
    if (time !== 0) {
      time--
    }
  }

  setInterval(lowerTimer, 1000);


  //constantly check for these conditions
  onUpdate(() => {
    if (duckContainer.toString() === foodOrder.toString()) {
      score1.value++
      score1.text = `Score: ${score1.value}`
      duckContainer.length = 0

      //reset order
      orderUpdate()

      //reset duck container
      resetDuckSprites()
      
      //shake on complete order
      shake(2)
      
      //reset timer
      time = 30;
    }

    // if (time === 0) {
    //   debug.log('lol')
    // }
  })
})
go('player1')
