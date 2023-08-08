kaboom();

//Background image
loadSprite("background", 'sprites/bg.png');
loadSprite("homebg", 'sprites/background-home.png');

//music
loadSound("music", "sprites/music.mp3")
loadSound("bonk", "sprites/bonk.mp3")
loadSound("nibbles-quack", "sprites/nibbles-quack.mp3")
loadSound("waddles-quack", "sprites/waddles-quack.mp3")
loadSound("home-music", "sprites/home-music.mp3")

//loading font
loadFont('arcade', 'ARCADECLASSIC.TTF')

//loading sprites
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
loadSprite('nibbles-front', 'sprites/nibbles-front.png')
loadSprite('nibbles-right', 'sprites/nibbles-right.png')
loadSprite('nibbles-back', 'sprites/nibbles-back.png')
loadSprite('nibbles-left', 'sprites/nibbles-left.png')
loadSprite('burger', 'sprites/burger.png')
loadSprite('taco', 'sprites/taco.png')
loadSprite('egg', 'sprites/egg.png')











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
  const waddles = add([sprite('front-duck'), pos(200, 250), scale(2.5), area(), body(), 'waddles']);
  const nibbles = add([sprite('nibbles-front'), pos(200, 168), scale(2.5), area(), body(), 'nibbles']);
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
    waddles.use(sprite('right-duck'))
    waddles.move(SPEED, 0)
  });

  onKeyDown('left', () => {
    waddles.use(sprite('left-duck'))
    waddles.move(-SPEED, 0)
  });

  onKeyDown('up', () => {
    waddles.use(sprite('back-duck'))
    waddles.move(0, -SPEED)
  });

  onKeyDown('down', () => {
    waddles.use(sprite('front-duck'))
    waddles.move(0, SPEED)
  });

  // movement duck 2

  onKeyDown('d', () => {
    nibbles.use(sprite('nibbles-right'))
    nibbles.move(SPEED, 0)
  });

  onKeyDown('a', () => {
    nibbles.use(sprite('nibbles-left'))
    nibbles.move(-SPEED, 0)
  });

  onKeyDown('w', () => {
    nibbles.use(sprite('nibbles-back'))
    nibbles.move(0, -SPEED)
  });

  onKeyDown('s', () => {
    nibbles.use(sprite('nibbles-front'))
    nibbles.move(0, SPEED)
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

  const waddlesContainer = []
  const waddlesSprites = []
  let waddlesContainerPos = 150

  const resetWaddlesSprites = () => {
    for (let i = 0; i < waddlesSprites.length; i++) {
      destroy(waddlesSprites[i])
    }
    waddlesContainerPos = 150
  }

  //deleting items from array
  waddles.onCollide("trash", () => {
    waddlesContainer.length = 0
    resetWaddlesSprites()
    shake(2.6)
    time -= 10
  });

  //collecting items and storing in array
  waddles.onCollide("bun", () => {
    waddlesContainer.push("bun")
    waddlesSprites.push(add([sprite('bun'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  waddles.onCollide("cheese", () => {
    waddlesContainer.push("cheese")
    waddlesSprites.push(add([sprite('cheese'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  waddles.onCollide("meat", () => {
    waddlesContainer.push("meat")
    waddlesSprites.push(add([sprite('meat'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  waddles.onCollide("lettuce", () => {
    waddlesContainer.push("lettuce")
    waddlesSprites.push(add([sprite('lettuce'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  waddles.onCollide("peppers", () => {
    waddlesContainer.push("peppers")
    waddlesSprites.push(add([sprite('peppers'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  //play Music 
  const music = play("music", {
    paused: true,
    volume: 0.1,
    loop: true
  })

  onKeyPress("m", () => music.paused = !music.paused)

  // hitting nibbles

  waddles.onCollide('nibbles', () => {
    shake(3)
    addKaboom(nibbles.pos)
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
  // quacking 

  onKeyPress("q", () => play("nibbles-quack"))
  onKeyPress("z", () => play("waddles-quack"))

  //creating food array order
  let foodOrder = randomArray(3);
  let spriteArr = []
  let orderPosition = 150
  for (let i = 0; i < foodOrder.length; i++) {
    spriteArr.push(add([sprite(foodOrder[i]), pos(150, orderPosition), scale(1.8)]))
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
      spriteArr[i] = (add([sprite(foodOrder[i]), pos(150, orderPosition), scale(1.8)]))
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

  //set waddles name tag
  const waddlesName = () => {
    const nameTag = add([
      text('Waddles', {
        font: 'arcade',
        size: 17
      }),
      pos(waddles.pos.x, waddles.pos.y - 15),
    ])
    setTimeout(function() {
      destroy(nameTag)
    }, 0.5);
  }

  //set nibbles name tag
  const nibblesName = () => {
    const nameTag = add([
      text('Nibbles', {
        font: 'arcade',
        size: 17
      }),
      pos(nibbles.pos.x, nibbles.pos.y - 15),
    ])
    setTimeout(function() {
      destroy(nameTag)
    }, 0.5);
  }
  //adding obstacles
  const addObstacle = () => {
    let randomY = rand(250, height() - 20)
    let enemy = add([sprite('burger'), pos(width() - 200, randomY), scale(1), area(), 'enemy', move(LEFT, 150),
      offscreen({ destroy: true })
    ])

    onUpdate(() => {
      enemy.onCollide('waddles', () => {
        shake(2.5)
        waddles.pos.x = rand(200, width() - 50);
        waddles.pos.y = rand(250, height() - 20);
      })
    })
  }
  loop(rand(2, 4), addObstacle)

  //constantly check for these conditions
  onUpdate(() => {
    if (waddlesContainer.toString() === foodOrder.toString()) {
      score1.value++
      score1.text = `Score: ${score1.value}`
      waddlesContainer.length = 0

      //reset food order
      orderUpdate()

      //reset waddles container
      resetWaddlesSprites()

      //shake on complete order
      shake(2)

      //reset timer
      time = 30;
    }

    if (time < 1) {
      go('gameOver')
      music.paused = true
      player1Scene = false
    }

    //constantly setting name
    waddlesName()
    nibblesName()
  })
})
















//2 player game
scene('player2', () => {

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
  const waddles = add([sprite('front-duck'), pos(200, 250), scale(2.5), area(), body(), 'waddles']);
  const nibbles = add([sprite('nibbles-front'), pos(200, 168), scale(2.5), area(), body(), 'nibbles']);
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
    waddles.use(sprite('right-duck'))
    waddles.move(SPEED, 0)
  });

  onKeyDown('left', () => {
    waddles.use(sprite('left-duck'))
    waddles.move(-SPEED, 0)
  });

  onKeyDown('up', () => {
    waddles.use(sprite('back-duck'))
    waddles.move(0, -SPEED)
  });

  onKeyDown('down', () => {
    waddles.use(sprite('front-duck'))
    waddles.move(0, SPEED)
  });

  // movement duck 2

  onKeyDown('d', () => {
    nibbles.use(sprite('nibbles-right'))
    nibbles.move(SPEED, 0)
  });

  onKeyDown('a', () => {
    nibbles.use(sprite('nibbles-left'))
    nibbles.move(-SPEED, 0)
  });

  onKeyDown('w', () => {
    nibbles.use(sprite('nibbles-back'))
    nibbles.move(0, -SPEED)
  });

  onKeyDown('s', () => {
    nibbles.use(sprite('nibbles-front'))
    nibbles.move(0, SPEED)
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

  //array for waddles
  const waddlesContainer = []
  const waddlesSprites = []
  let waddlesContainerPos = 150

  const resetWaddlesSprites = () => {
    for (let i = 0; i < waddlesSprites.length; i++) {
      destroy(waddlesSprites[i])
    }
    waddlesContainerPos = 150
  }

  //deleting items from array
  waddles.onCollide("trash", () => {
    waddlesContainer.length = 0
    resetWaddlesSprites()
    shake(2.6)
  });

  //collecting items and storing in array
  waddles.onCollide("bun", () => {
    waddlesContainer.push("bun")
    waddlesSprites.push(add([sprite('bun'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  waddles.onCollide("cheese", () => {
    waddlesContainer.push("cheese")
    waddlesSprites.push(add([sprite('cheese'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  waddles.onCollide("meat", () => {
    waddlesContainer.push("meat")
    waddlesSprites.push(add([sprite('meat'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  waddles.onCollide("lettuce", () => {
    waddlesContainer.push("lettuce")
    waddlesSprites.push(add([sprite('lettuce'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  waddles.onCollide("peppers", () => {
    waddlesContainer.push("peppers")
    waddlesSprites.push(add([sprite('peppers'), pos(1150, waddlesContainerPos), scale(1.5)]))
    waddlesContainerPos += 70
  })

  //array for nibbles
  const nibblesContainer = []
  const nibblesSprites = []
  let nibblesContainerPos = 150

  const resetNibblesSprites = () => {
    for (let i = 0; i < nibblesSprites.length; i++) {
      destroy(nibblesSprites[i])
    }
    nibblesContainerPos = 150
  }

  //deleting items from array
  nibbles.onCollide("trash", () => {
    nibblesContainer.length = 0
    resetNibblesSprites()
    shake(2.6)
  });

  //collecting items and storing in array
  nibbles.onCollide("bun", () => {
    nibblesContainer.push("bun")
    nibblesSprites.push(add([sprite('bun'), pos(1200, nibblesContainerPos), scale(1.5)]))
    nibblesContainerPos += 70
  })

  nibbles.onCollide("cheese", () => {
    nibblesContainer.push("cheese")
    nibblesSprites.push(add([sprite('cheese'), pos(1200, nibblesContainerPos), scale(1.5)]))
    nibblesContainerPos += 70
  })

  nibbles.onCollide("meat", () => {
    nibblesContainer.push("meat")
    nibblesSprites.push(add([sprite('meat'), pos(1200, nibblesContainerPos), scale(1.5)]))
    nibblesContainerPos += 70
  })

  nibbles.onCollide("lettuce", () => {
    nibblesContainer.push("lettuce")
    nibblesSprites.push(add([sprite('lettuce'), pos(1200, nibblesContainerPos), scale(1.5)]))
    nibblesContainerPos += 70
  })

  nibbles.onCollide("peppers", () => {
    nibblesContainer.push("peppers")
    nibblesSprites.push(add([sprite('peppers'), pos(1200, nibblesContainerPos), scale(1.5)]))
    nibblesContainerPos += 70
  })

  //play Music 
  const music = play("music", {
    paused: true,
    volume: 0.1,
    loop: true
  })

  onKeyPress("m", () => music.paused = !music.paused)

  // hitting nibbles
  loadSound("bonk", "sprites/bonk.mp3")

  waddles.onCollide('nibbles', () => {
    shake(3)
    addKaboom(nibbles.pos)
    play("bonk")
  })

  //score text for waddles
  let waddlesScore = add([
    text(`Score: 0`, {
      font: 'arcade',
      size: 30
    }),
    pos(1200, 20),
    { value: 0 }
  ])

  // quacking 

  onKeyPress("q", () => play("nibbles-quack"))
  onKeyPress("z", () => play("waddles-quack"))

  //score text for nibbles
  let nibblesScore = add([
    text(`Score: 0`, {
      font: 'arcade',
      size: 30
    }),
    pos(200, 20),
    { value: 0 }
  ])

  //creating food array order
  let foodOrder = randomArray(3);
  let spriteArr = []
  let orderPosition = 150
  for (let i = 0; i < foodOrder.length; i++) {
    spriteArr.push(add([sprite(foodOrder[i]), pos(150, orderPosition), scale(1.8)]))
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
      spriteArr[i] = (add([sprite(foodOrder[i]), pos(150, orderPosition), scale(1.8)]))
      orderPosition += 70
    }
  }

  //set waddles name tag
  const waddlesName = () => {
    const nameTag = add([
      text('Waddles', {
        font: 'arcade',
        size: 17
      }),
      pos(waddles.pos.x, waddles.pos.y - 15),
    ])
    setTimeout(function() {
      destroy(nameTag)
    }, 0.5);
  }

  //set nibbles name tag
  const nibblesName = () => {
    const nameTag = add([
      text('Nibbles', {
        font: 'arcade',
        size: 17
      }),
      pos(nibbles.pos.x, nibbles.pos.y - 15),
    ])
    setTimeout(function() {
      destroy(nameTag)
    }, 0.5);
  }

  //creating obstacles
  const addObstacle = () => {
    let randomY = rand(250, height() - 20)
    let enemy = add([sprite('burger'), pos(width() - 200, randomY), scale(1), area(), 'enemy', move(LEFT, 150),
      offscreen({ destroy: true })
    ])

    onUpdate(() => {
      enemy.onCollide('waddles', () => {
        shake(2.5)
        waddles.pos.x = rand(200, width() - 50);
        waddles.pos.y = rand(250, height() - 20);
      })

      enemy.onCollide('nibbles', () => {
        shake(2.5)
        nibbles.pos.x = rand(200, width() - 50);
        nibbles.pos.y = rand(250, height() - 20);
      })
    })
  }

  loop(rand(2, 4), addObstacle)

  //constantly check for these conditions
  onUpdate(() => {
    if (waddlesContainer.toString() === foodOrder.toString()) {
      waddlesScore.value++
      waddlesScore.text = `Score: ${waddlesScore.value}`
      waddlesContainer.length = 0
      nibblesContainer.length = 0

      //reset food order
      orderUpdate()

      //reset container
      resetWaddlesSprites()
      resetNibblesSprites()

      //shake on complete order
      shake(2)
    }
    else if (nibblesContainer.toString() === foodOrder.toString()) {
      nibblesScore.value++
      nibblesScore.text = `Score: ${nibblesScore.value}`
      waddlesContainer.length = 0
      nibblesContainer.length = 0

      //reset food order
      orderUpdate()

      //reset containers
      resetNibblesSprites()
      resetWaddlesSprites()

      //shake on complete order
      shake(2)
    }

    waddlesName()
    nibblesName()
  })
})

















//homescreen
scene("home", () => {


  add([
    sprite('homebg', { width: width(), height: height() }),
    scale(1),
  ])

  add([
    text("Waddles  and  Nibbles  Eatery", {
      font: 'arcade',
    }),
    scale(1),
    pos(width() / 3, 15)
  ])

  //load Sprite
  const waddles = add([sprite('front-duck'), pos(200, 250), scale(2.5), area(), body(), 'waddles', {
    speed: choose([230, 300]),
    dir: choose([-1, 1]),
  }]);
  const nibbles = add([sprite('nibbles-front'), pos(800, 70), scale(2.5), area(), body(), 'nibbles', {
    speed: choose([180, 90]),
    dir: choose([-2, 2]),
  }]);

  const burger = add([sprite('burger'), pos(90, 70), scale(2.5), area(), body(), 'burger', {
    speed: choose([100, 50]),
    dir: choose([-3, 3]),
  }]);

  //nibbles motion 
  const nibblesAi = () => {
    const left = nibbles.move(nibbles.dir * nibbles.speed, 0)
    if (nibbles.pos.x < 0 || nibbles.pos.x > width() - 90) {
      nibbles.dir = -nibbles.dir
    }

    const right = nibbles.move(0, nibbles.dir * nibbles.speed)
    if (nibbles.pos.y < 0 || nibbles.pos.y > height() - 120) {
      nibbles.dir = -nibbles.dir;
    }
  }

  //waddles motion
  const waddlesAi = () => {
    waddles.move(waddles.dir * waddles.speed, 0)
    if (waddles.pos.x < 0 || waddles.pos.x > width() - 90) {
      waddles.dir = -waddles.dir;
    }

    waddles.move(0, waddles.dir * waddles.speed)
    if (waddles.pos.y < 0 || waddles.pos.y > height() - 120) {
      waddles.dir = -waddles.dir
    }
  }

  // burger motion 
  const burgerAi = () => {
    burger.move(burger.dir * burger.speed, 0)
    if (burger.pos.x < 0 || burger.pos.x > width() - 90) {
      burger.dir = -burger.dir
    }

    const right = burger.move(0, burger.dir * burger.speed)
    if (burger.pos.y < 0 || burger.pos.y > height() - 120) {
      burger.dir = -burger.dir;
    }
  }


  onUpdate(() => {
    nibblesAi()
    waddlesAi()
    burgerAi()
  })

  const music = play("home-music", {
    paused: true,
    volume: 0.1,
    loop: true
  })

  onKeyPress("m", () => music.paused = !music.paused)

  function addButton(txt, p, f) {

    // add a parent background object

    const btn = add([
      rect(240, 80, { radius: 8 }),
      pos(p),
      area(),
      scale(1),
      anchor("center"),
      outline(2)

    ])

    // add a child object that displays the text
    btn.add([
      text(txt, {
        font: 'arcade',
      }),
      anchor("center"),
      color(0, 0, 0),
    ])

    // onHoverUpdate() comes from area() component
    // it runs every frame when the object is being hovered
    btn.onHoverUpdate(() => {
      const t = time() * 10
      btn.scale = vec2(1.2)
      setCursor("pointer")
    })

    // onHoverEnd() comes from area() component
    // it runs once when the object stopped being hovered
    btn.onHoverEnd(() => {
      btn.scale = vec2(1)
      btn.color = rgb()
    })

    // onClick() comes from area() component
    // it runs once when the object is clicked
    btn.onClick(f)
    btn.onClick(() => music.paused = true)

    return btn

  }
  addButton("1 Player", vec2(width() / 2, (height() / 2) - 75), () => go("player1"))
  addButton("2 Players", vec2(width() / 2, (height() / 2) + 75), () => go("player2"))
})















//game over scene
scene("gameOver", () => {

  add([
    sprite('homebg', { width: width(), height: height() }),
    scale(1),
  ])

  add([
    text('game over', {
      font: 'arcade',
    }),
    anchor("center"),
    pos(width() / 2, height() / 2),
    color(0, 0, 0),
  ])

  onKeyPress("space", () => go("home"));
})

scene("waddles-win", () => {

})

scene("nibbles-win", () => {

})



//starting game
go('home')
