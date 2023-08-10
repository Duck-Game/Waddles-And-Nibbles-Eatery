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
loadSound("scary-music", "sprites/scary-music.mp3")
loadSound("touch-box", "sprites/touch-box.mp3")
loadSound("chomp", "sprites/chomp.mp3")
loadSound("arcade", "sprites/arcade.mp3")
loadSound("trash", "sprites/trash.mp3")
loadSound("warp", "sprites/warp.mp3")
loadSound("win", "sprites/win.mp3")
loadSound("home-hover", "sprites/home-hover.mp3")
loadSound("home-click", "sprites/home-click.mp3")
loadSound("game-over", "sprites/game-over.mp3")

//loading font
loadFont('arcade', 'REDENSEK.TTF')

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
loadSprite('octoducktapus', 'sprites/octoducktapus.png')
loadSprite('banana', 'sprites/banana.png')










//setting game player 1
scene('player1', () => {

  //setting background
  add([
    sprite('background', { width: width(), height: height() }),
    scale(1)
  ])
  //hi
  //wall boundry
  add([
    rect(width(), 2),
    area(),
    pos(0, 150),
    body({ isStatic: true }),
    color(223, 195, 150)
  ]);

  add([
    rect(width(), 2),
    area(),
    pos(0, 660),
    body({ isStatic: true }),
    color(182, 122, 74)
  ]);

  add([
    rect(2, height()),
    area(),
    pos(-2, 0),
    body({ isStatic: true }),
  ]);

  add([
    rect(2, height()),
    area(),
    pos(1450, 0),
    body({ isStatic: true }),
  ]);

  //setting sprite variables
  const waddles = add([sprite('front-duck'), pos(690, 220), scale(2.5), area(), body(), 'waddles']);
  const nibbles = add([sprite('nibbles-front'), pos(400, 180), scale(2.5), area(), body({ isStatic: true }), 'nibbles']);
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
  let waddlesContainerPos = 1015

  const resetWaddlesSprites = () => {
    for (let i = 0; i < waddlesSprites.length; i++) {
      destroy(waddlesSprites[i])
    }
    waddlesContainerPos = 1015

  }

  //deleting items from array
  waddles.onCollide("trash", () => {
    play("trash", {
      volume: 0.2,
    })
    waddlesContainer.length = 0
    resetWaddlesSprites()
    shake(2.6)
    time -= 5
  });

  //collecting items and storing in array
  waddles.onCollide("bun", () => {
    waddlesContainer.push("bun")
    waddlesSprites.push(add([sprite('bun'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  waddles.onCollide("cheese", () => {
    waddlesContainer.push("cheese")
    waddlesSprites.push(add([sprite('cheese'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  waddles.onCollide("meat", () => {
    waddlesContainer.push("meat")
    waddlesSprites.push(add([sprite('meat'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  waddles.onCollide("lettuce", () => {
    waddlesContainer.push("lettuce")
    waddlesSprites.push(add([sprite('lettuce'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  waddles.onCollide("peppers", () => {
    waddlesContainer.push("peppers")
    waddlesSprites.push(add([sprite('peppers'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  //waddles container name
  add([
    text('Waddles Food', {
      font: 'arcade',
      size: 35
    }),
    pos(1130, 167),
  ])

  const music = play("music", {
    paused: false,
    volume: 0.1,
    loop: true
  })

  onKeyPress("m", () => music.paused = !music.paused)

  onSceneLeave(() => music.paused = true)

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
      size: 35
    }),
    pos(1200, 20),
    { value: 0 }
  ])
  // quacking 

  onKeyPress("q", () => {
    play("nibbles-quack")
    const nameTag = add([
      text('Quack', {
        font: 'arcade',
        size: 20
      }),
      pos(nibbles.pos.x, nibbles.pos.y - 40),
    ])

    setTimeout(function() {
      destroy(nameTag)
    }, 200);

    setTimeout(function() {
      play("waddles-quack")
      const nameTag = add([
        text('Quack', {
          font: 'arcade',
          size: 20
        }),
        pos(waddles.pos.x, waddles.pos.y - 40),
      ])

      setTimeout(function() {
        destroy(nameTag)
      }, 200);
    }, 1030);
  })

  onKeyPress("/", () => {
    play("waddles-quack")
    const nameTag = add([
      text('Quack', {
        font: 'arcade',
        size: 20
      }),
      pos(waddles.pos.x, waddles.pos.y - 40),
    ])

    setTimeout(function() {
      destroy(nameTag)
    }, 200);

    setTimeout(function() {
      play("nibbles-quack")
      const nameTag = add([
        text('Quack', {
          font: 'arcade',
          size: 20
        }),
        pos(nibbles.pos.x, nibbles.pos.y - 40),
      ])

      setTimeout(function() {
        destroy(nameTag)
      }, 200);
    }, 1030);
  })


  //add white box around food
  add([
    rect(350, 70),
    outline(1),
    pos(550, 70),
    color(255, 229, 180)
  ]);

  //adding food order text
  add([
    text('Food  Order', {
      font: 'arcade',
      size: 35
    }),
    pos(635, 15),
  ])

  //creating food array order
  let foodOrder = randomArray(3);
  let spriteArr = []
  let orderPosition = 550
  for (let i = 0; i < foodOrder.length; i++) {
    spriteArr.push(add([sprite(foodOrder[i]), pos(orderPosition, 75), scale(1.6)]))
    orderPosition += 70
  }
  //function to destroy then recreate order
  const orderUpdate = () => {
    destroy(spriteArr[1])
    destroy(spriteArr[2])
    destroy(spriteArr[3])

    foodOrder = randomArray(3)
    orderPosition = 620
    for (let i = 1; i < foodOrder.length - 1; i++) {
      spriteArr[i] = (add([sprite(foodOrder[i]), pos(orderPosition, 75), scale(1.6)]))
      orderPosition += 70
    }
  }

  //timer function
  let time = 30;

  let timer = add([
    text(`0:${time}`, {
      font: 'arcade',
      size: 40
    }),
    pos(145, 15),
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
        size: 22
      }),
      pos(waddles.pos.x - 7, waddles.pos.y - 18),
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
        size: 22
      }),
      pos(nibbles.pos.x, nibbles.pos.y - 10),
    ])
    setTimeout(function() {
      destroy(nameTag)
    }, 0.5);
  }
  //adding obstacles
  const addObstacle = () => {
    let randomY = rand(250, 650)
    let enemy = add([sprite('banana'), pos(width() - 80, randomY), scale(0.035), area(), 'enemy', move(LEFT, 150),
      offscreen({ destroy: true })
    ])

    enemy.onCollide('waddles', () => {
      play("warp", {
        volume: 0.3,
      })
    })

    onUpdate(() => {
      enemy.onCollide('waddles', () => {
        shake(2.5)
        waddles.pos.x = rand(200, width() - 50);
        waddles.pos.y = rand(250, 550);
      })
    })
  }
  loop(rand(2, 4), addObstacle)

  onKeyPress("escape", () => {
    go("home")
    play("home-click", {
      volume: 0.2,
    })
  });

  //constantly check for these conditions
  onUpdate(() => {
    if (waddlesContainer.toString() === foodOrder.toString()) {
      score1.value++
      score1.text = `Score: ${score1.value}`
      waddlesContainer.length = 0

      play("arcade", {
        volume: 0.2,
      })

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
    pos(0, 150),
    body({ isStatic: true }),
    color(223, 195, 150)
  ]);

  add([
    rect(width(), 2),
    area(),
    pos(0, 660),
    body({ isStatic: true }),
    color(182, 122, 74)
  ]);

  add([
    rect(2, height()),
    area(),
    pos(-2, 0),
    body({ isStatic: true }),
    color(182, 122, 74)
  ]);

  add([
    rect(2, height()),
    area(),
    pos(1450, 0),
    body({ isStatic: true }),
    color(182, 122, 74)
  ]);


  //setting sprite variables
  const waddles = add([sprite('front-duck'), pos(740, 290), scale(2.5), area(), body(), 'waddles']);
  const nibbles = add([sprite('nibbles-front'), pos(650, 280), scale(2.5), area(), body(), 'nibbles']);
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
  let waddlesContainerPos = 1015

  const resetWaddlesSprites = () => {
    for (let i = 0; i < waddlesSprites.length; i++) {
      destroy(waddlesSprites[i])
    }
    waddlesContainerPos = 1015
  }

  //deleting items from array
  waddles.onCollide("trash", () => {
    waddlesContainer.length = 0
    resetWaddlesSprites()
    shake(2.6)
    play("trash", {
      volume: 0.2,
    })
  });

  //collecting items and storing in array
  waddles.onCollide("bun", () => {
    waddlesContainer.push("bun")
    waddlesSprites.push(add([sprite('bun'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  waddles.onCollide("cheese", () => {
    waddlesContainer.push("cheese")
    waddlesSprites.push(add([sprite('cheese'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  waddles.onCollide("meat", () => {
    waddlesContainer.push("meat")
    waddlesSprites.push(add([sprite('meat'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  waddles.onCollide("lettuce", () => {
    waddlesContainer.push("lettuce")
    waddlesSprites.push(add([sprite('lettuce'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  waddles.onCollide("peppers", () => {
    waddlesContainer.push("peppers")
    waddlesSprites.push(add([sprite('peppers'), pos(waddlesContainerPos, 200), scale(1.5)]))
    waddlesContainerPos += 70
    play("touch-box")
  })

  add([
    text('Waddles Food', {
      font: 'arcade',
      size: 33
    }),
    pos(1110, 162),
  ])

  //array for nibbles
  const nibblesContainer = []
  const nibblesSprites = []
  let nibblesContainerPos = 20

  const resetNibblesSprites = () => {
    for (let i = 0; i < nibblesSprites.length; i++) {
      destroy(nibblesSprites[i])
    }
    nibblesContainerPos = 20
  }

  //deleting items from array
  nibbles.onCollide("trash", () => {
    nibblesContainer.length = 0
    resetNibblesSprites()
    shake(2.6)
    play("trash")
  });

  //collecting items and storing in array
  nibbles.onCollide("bun", () => {
    nibblesContainer.push("bun")
    nibblesSprites.push(add([sprite('bun'), pos(nibblesContainerPos, 200), scale(1.5)]))
    nibblesContainerPos += 70
    play("touch-box")
  })

  nibbles.onCollide("cheese", () => {
    nibblesContainer.push("cheese")
    nibblesSprites.push(add([sprite('cheese'), pos(nibblesContainerPos, 200), scale(1.5)]))
    nibblesContainerPos += 70
    play("touch-box")
  })

  nibbles.onCollide("meat", () => {
    nibblesContainer.push("meat")
    nibblesSprites.push(add([sprite('meat'), pos(nibblesContainerPos, 200), scale(1.5)]))
    nibblesContainerPos += 70
    play("touch-box")
  })

  nibbles.onCollide("lettuce", () => {
    nibblesContainer.push("lettuce")
    nibblesSprites.push(add([sprite('lettuce'), pos(nibblesContainerPos, 200), scale(1.5)]))
    nibblesContainerPos += 70
    play("touch-box")
  })

  nibbles.onCollide("peppers", () => {
    nibblesContainer.push("peppers")
    nibblesSprites.push(add([sprite('peppers'), pos(nibblesContainerPos, 200), scale(1.5)]))
    nibblesContainerPos += 70
    play("touch-box")
  })

  //nibbles food text
  add([
    text('Nibbles Food', {
      font: 'arcade',
      size: 33
    }),
    pos(160, 162),
  ])


  const music = play("music", {
    //changed true to false
    paused: false,
    volume: 0.1,
    loop: true
  })

  onKeyPress("m", () => music.paused = !music.paused)

  onSceneLeave(() => music.paused = true)


  // hitting nibbles
  waddles.onCollide('nibbles', () => {
    shake(3)
    addKaboom(nibbles.pos)
    play("bonk")
    waddles.pos.x = waddles.pos.x + 50
    nibbles.pos.x = nibbles.pos.x - 50

  })

  //score text for waddles
  let waddlesScore = add([
    text(`Score: 0`, {
      font: 'arcade',
      size: 32
    }),
    pos(1200, 20),
    { value: 0 }
  ])

  // quacking 
  onKeyPress("q", () => {
    play("nibbles-quack")
    const nameTag = add([
      text('Quack', {
        font: 'arcade',
        size: 22
      }),
      pos(nibbles.pos.x, nibbles.pos.y - 40),
    ])

    setTimeout(function() {
      destroy(nameTag)
    }, 200);

    setTimeout(function() {
      play("waddles-quack")
      const nameTag = add([
        text('Quack', {
          font: 'arcade',
          size: 20
        }),
        pos(waddles.pos.x, waddles.pos.y - 40),
      ])

      setTimeout(function() {
        destroy(nameTag)
      }, 200);
    }, 1300);
  })

  onKeyPress("/", () => {
    play("waddles-quack")
    const nameTag = add([
      text('Quack', {
        font: 'arcade',
        size: 20
      }),
      pos(waddles.pos.x, waddles.pos.y - 40),
    ])

    setTimeout(function() {
      destroy(nameTag)
    }, 200);

    setTimeout(function() {
      play("nibbles-quack")
      const nameTag = add([
        text('Quack', {
          font: 'arcade',
          size: 20
        }),
        pos(nibbles.pos.x, nibbles.pos.y - 40),
      ])

      setTimeout(function() {
        destroy(nameTag)
      }, 200);
    }, 1030);
  })

  //score text for nibbles
  let nibblesScore = add([
    text(`Score: 0`, {
      font: 'arcade',
      size: 32
    }),
    pos(200, 20),
    { value: 0 }
  ])

  //add white box around food
  add([
    rect(350, 70),
    outline(1),
    pos(550, 70),
    color(255, 229, 180)
  ]);

  //adding food order text
  add([
    text('Food Order', {
      font: 'arcade',
      size: 32
    }),
    pos(658, 20),
  ])

  //creating food array order
  let foodOrder = randomArray(3);
  let spriteArr = []
  let orderPosition = 550
  for (let i = 0; i < foodOrder.length; i++) {
    spriteArr.push(add([sprite(foodOrder[i]), pos(orderPosition, 75), scale(1.6)]))
    orderPosition += 70
  }
  //function to destroy then recreate order
  const orderUpdate = () => {
    destroy(spriteArr[1])
    destroy(spriteArr[2])
    destroy(spriteArr[3])

    foodOrder = randomArray(3)
    orderPosition = 620
    for (let i = 1; i < foodOrder.length - 1; i++) {
      spriteArr[i] = (add([sprite(foodOrder[i]), pos(orderPosition, 75), scale(1.6)]))
      orderPosition += 70
    }
  }

  //set waddles name tag
  const waddlesName = () => {
    const nameTag = add([
      text('Waddles', {
        font: 'arcade',
        size: 19
      }),
      pos(waddles.pos.x + 2, waddles.pos.y - 18),
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
        size: 19
      }),
      pos(nibbles.pos.x + 3, nibbles.pos.y - 15),
    ])
    setTimeout(function() {
      destroy(nameTag)
    }, 0.5);
  }

  //creating obstacles
  const addObstacle = () => {
    let randomY = rand(250, 650)
    let enemy = add([sprite('banana'), pos(width() - 80, randomY), scale(0.035), area(), 'enemy', move(LEFT, 150),
      offscreen({ destroy: true })
    ])

    enemy.onCollide('waddles', () => {
      play("warp", {
        volume: 0.3,
      })
    })

    enemy.onCollide('nibbles', () => {
      play("warp", {
        volume: 0.3,
      })
    })

    onUpdate(() => {
      enemy.onCollide('waddles', () => {
        shake(2.5)
        waddles.pos.x = rand(200, width() - 50);
        waddles.pos.y = rand(250, 550);
      })

      enemy.onCollide('nibbles', () => {
        shake(2.5)
        nibbles.pos.x = rand(200, width() - 50);
        nibbles.pos.y = rand(250, 550);
      })
    })
  }

  loop(rand(2, 4), addObstacle)

  //escape game

  onKeyPress("escape", () => {
    go("home")
    play("home-click", {
      volume: 0.2,
    })
  });

  let octo = true;
  const octoducktapus = add([sprite('octoducktapus'), pos(5000, 5066), scale(1.5), area(), body({ isStatic: true }), 'octoducktapus', ]);
  octoducktapus.onCollide('waddles', () => {
    go('easterEgg')
  })
  octoducktapus.onCollide('nibbles', () => {
    go('easterEgg')
  })

  //constantly check for these conditions
  onUpdate(() => {
    if (waddlesContainer.toString() === foodOrder.toString()) {
      waddlesScore.value++
      waddlesScore.text = `Score: ${waddlesScore.value}`
      waddlesContainer.length = 0
      nibblesContainer.length = 0

      play("arcade", {
        volume: 0.2,
      })

      //reset food order
      orderUpdate()

      //reset container
      resetWaddlesSprites()
      resetNibblesSprites()

      //shake on complete order
      shake(2)

      // Winner
      if (waddlesScore.value === 10) {
        go("waddles-win")
      }

    }
    else if (nibblesContainer.toString() === foodOrder.toString()) {
      nibblesScore.value++
      nibblesScore.text = `Score: ${nibblesScore.value}`
      waddlesContainer.length = 0
      nibblesContainer.length = 0
      play("arcade", {
        volume: 0.2,
      })

      //reset food order
      orderUpdate()

      //reset containers
      resetNibblesSprites()
      resetWaddlesSprites()

      //shake on complete order
      shake(2)

      //nibles win
      if (nibblesScore.value === 10) {
        go("nibbles-win")
      }
    }

    waddlesName()
    nibblesName()

    if (waddlesScore.value === 8 && octo) {
      octoducktapus.pos.x = 1000;
      octoducktapus.pos.y = 166;
      octo = false;
    }
    if (nibblesScore.value === 8 && octo) {
      octoducktapus.pos.x = 1000;
      octoducktapus.pos.y = 166;
      octo = false;
    }
  })
})

















//homescreen
scene("home", () => {

  //add background
  add([
    sprite('homebg', { width: width(), height: height() }),
    scale(1),
  ])

  //Display Game title
  add([
    text("Waddles  and  Nibbles  Eatery", {
      font: 'arcade',
      size: 40
    }),
    scale(1),
    pos(width() / 3, 15)
  ])

  //load Sprite
  const waddles = add([sprite('front-duck'), pos(rand(0, width() - 50, ), rand(0, height() - 130)), scale(2.5), area(), 'waddles', {
    speed: choose([230, 300]),
    dir: choose([-1, 1]),
  }]);

  const nibbles = add([sprite('nibbles-front'), pos(rand(0, width() - 50, ), rand(0, height() - 130)), scale(2.5), area(), 'nibbles', {
    speed: choose([180, 90]),
    dir: choose([-2, 2]),
  }]);

  const burger = add([sprite('burger'), pos(rand(0, width() - 50, ), rand(0, height() - 130)), scale(2.5), area(), 'burger', {
    speed: choose([100, 50]),
    dir: choose([-3, 3]),
  }]);

  const cheese = add([sprite('cheese'), pos(rand(0, width() - 50, ), rand(0, height() - 130)), scale(2.5), area(), 'cheese', {
    speed: choose([100, 50]),
    dir: choose([-3, 3]),
  }]);

  const lettuce = add([sprite('lettuce'), pos(rand(0, width() - 50, ), rand(0, height() - 130)), scale(2.5), area(), 'lettuce', {
    speed: choose([100, 50]),
    dir: choose([-3, 3]),
  }]);

  const bun = add([sprite('bun'), pos(rand(0, width() - 50, ), rand(0, height() - 130)), scale(2.5), area(), 'bun', {
    speed: choose([230, 300]),
    dir: choose([-1, 1]),
  }]);

  const peppers = add([sprite('peppers'), pos(rand(0, width() - 50, ), rand(0, height() - 130)), scale(2.5), area(), 'peppers', {
    speed: choose([230, 300]),
    dir: choose([-1, 1]),
  }]);

  //nibbles motion 
  const nibblesAi = () => {
    nibbles.move(nibbles.dir * nibbles.speed, 0)
    if (nibbles.pos.x < 0 || nibbles.pos.x > width() - 90) {
      nibbles.dir = -nibbles.dir
    }

    nibbles.move(0, nibbles.dir * nibbles.speed)
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
  }

  // Cheese motion 
  const cheeseAi = () => {
    cheese.move(cheese.dir * cheese.speed, 0)
    if (cheese.pos.x < 0 || cheese.pos.x > width() - 90) {
      cheese.dir = -cheese.dir
    }
  }

  //lettuce motion
  const lettuceAi = () => {
    lettuce.move(lettuce.dir * lettuce.speed, 0)
    if (lettuce.pos.x < 0 || lettuce.pos.x > width() - 90) {
      lettuce.dir = -lettuce.dir
    }
  }

  //bun motion 

  const bunAi = () => {
    bun.move(bun.dir * bun.speed, 0)
    if (bun.pos.x < 0 || bun.pos.x > width() - 90) {
      bun.dir = -bun.dir
    }

    bun.move(0, bun.dir * bun.speed)
    if (bun.pos.y < 0 || bun.pos.y > height() - 120) {
      bun.dir = -bun.dir;
    }
  }

  //peppers motion 

  const peppersAi = () => {
    peppers.move(peppers.dir * peppers.speed, 0)
    if (peppers.pos.x < 0 || peppers.pos.x > width() - 90) {
      peppers.dir = -peppers.dir
    }

    peppers.move(0, peppers.dir * peppers.speed)
    if (peppers.pos.y < 0 || peppers.pos.y > height() - 120) {
      peppers.dir = -peppers.dir;
    }
  }


  //initialize Ai
  loop(0.015, () => {
    nibblesAi()
    waddlesAi()
    burgerAi()
    cheeseAi()
    lettuceAi()
    bunAi()
    peppersAi()
  })

  //play music

  const music = play("home-music", {
    paused: false,
    volume: 0.2,
    loop: true
  })

  onKeyPress("m", () => music.paused = !music.paused)

  onSceneLeave(() => music.paused = true)


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
    const sound = () => {

      btn.onHoverUpdate(() => {
        const t = time() * 10
        btn.scale = vec2(1.2)
        setCursor("pointer")
      })

      btn.onHover(() => {
        play("home-hover", {
          volume: 0.2,
        })
      })

    }

    sound()

    // onHoverEnd() comes from area() component
    // it runs once when the object stopped being hovered
    btn.onHoverEnd(() => {
      btn.scale = vec2(1)
      btn.color = rgb()
    })

    // onClick() comes from area() component
    // it runs once when the object is clicked
    btn.onClick(f)
    btn.onClick(() => {
      play("home-click", {
        volume: 0.2,
      })
    })

    return btn

  }
  addButton("1 Player", vec2(width() / 2, (height() / 2) - 75), () => go("player1"))
  addButton("2 Players", vec2(width() / 2, (height() / 2) + 55), () => go("player2"))
  addButton("How to Play", vec2(width() / 2, (height() / 2) + 190), () => go("howTo"))
})















//game over scene
scene("gameOver", () => {
  //add background
  add([
    sprite('homebg', { width: width(), height: height() }),
    scale(1),
  ])
  //game over text
  add([
    text('GAME  OVER', {
      font: 'arcade',
      size: 45,
    }),
    anchor("center"),
    pos(width() / 2, height() / 2),
    color(0, 0, 0),
  ])

  //add music
  play("game-over")

  //replay/ return to home screen
  add([
    text('Press  esc  to  go  home  or  press  space  to  restart', {
      font: 'arcade',
      size: 35
    }),
    anchor("center"),
    pos(width() / 2, (height() / 2) + 55),
    color(0, 0, 0),
  ])

  onKeyPress("space", () => {
    go("player1")
    play("home-click", {
      volume: 0.2,
    })
  });
  onKeyPress("escape", () => {
    go("home")
    play("home-click", {
      volume: 0.2,
    })
  });
})









scene("waddles-win", () => {
  add([
    sprite('background', { width: width(), height: height() }),
    scale(1)
  ])

  //Play sound
  let music = play("win", {
    volume: 0.2,
  })
  onKeyPress("m", () => music.paused = !music.paused)

  onSceneLeave(() => music.paused = true)

  //winning text
  add([
    text("Waddles WINS!!", {
      size: 28,
      align: 'center',
    }),
    pos(620, 400),
  ])


  add([
    text('Press  esc  to  go  home  or  press  space  to  restart', {
      font: 'arcade',
      size: 38,
      align: 'center'
    }),
    anchor("center"),
    pos(width() / 2, 610),
    color(180, 180, 180)
  ])


  const waddles = add([sprite('front-duck'), pos(650, 250), scale(5), area(), body(), 'waddles']);
  const nibbles = add([sprite('nibbles-front'), pos(100, 220), scale(2.5), area(), body(), 'nibbles']);

  const leftCounter = add([sprite('left-counter'), pos(450, 140), scale(1.3), area(), body({ isStatic: true })]);
  const rightCounter = add([sprite('right-counter'), pos(800, 145), scale(1.3), area(), body({ isStatic: true })]);
  const trashcan = add([sprite('trashcan'), pos(705, 165), scale(1.2), area(), body({ isStatic: true }), 'trash']);

  const breadTable = add([sprite('bread-table'), pos(300, 500), scale(1.2), area(), body({ isStatic: true }), 'bun']);
  const cheeseTable = add([sprite('cheese-table'), pos(500, 500), scale(1.2), area(), body({ isStatic: true }), 'cheese']);
  const meatTable = add([sprite('meat-table'), pos(700, 500), scale(1.2), area(), body({ isStatic: true }), 'meat']);
  const lettuceTable = add([sprite('lettuce-table'), pos(900, 500), scale(1.2), area(), body({ isStatic: true }), 'lettuce']);
  const pepperTable = add([sprite('pepper-table'), pos(1100, 500), scale(1.2), area(), body({ isStatic: true }), 'peppers']);

  //confetti
  const sprites = [
    "peppers",
    "cheese",
    "lettuce",
    'nibbles-back',
    'bun',
    'burger',
    'egg',
  ]

  // load elements on screen
  const confetti = () => {

    let randomX = rand(0, width())
    let particle = add([sprite(choose(sprites)), pos(randomX, 0), scale(1), area(), 'enemy', move(DOWN, 150),
      offscreen({ destroy: true })
    ])
  }
  loop(rand(1, 0.2), confetti)

  onKeyPress("space", () => {
    go("player2")
    play("home-click", {
      volume: 0.2,
    })
  });
  onKeyPress("escape", () => {
    go("home")
    play("home-click", {
      volume: 0.2,
    })
  });
})










scene("nibbles-win", () => {
  // background
  add([
    sprite('background', { width: width(), height: height() }),
    scale(1)
  ])

  //Play sound
  let music = play("win", {
    volume: 0.2,
  })
  onKeyPress("m", () => music.paused = !music.paused)

  onSceneLeave(() => music.paused = true)

  //winning text
  add([
    text("NIBBLES WINS!!", {
      size: 28,
      align: 'center',
    }),
    pos(620, 400),
  ])

  add([
    text('Press  esc  to  go  home  or  press  space  to  restart', {
      font: 'arcade',
      size: 38,
      align: 'center'
    }),
    anchor("center"),
    pos(width() / 2, 610),
    color(180, 180, 180)
  ])

  const waddles = add([sprite('front-duck'), pos(100, 220), scale(2.5), area(), body(), 'waddles']);
  const nibbles = add([sprite('nibbles-front'), pos(650, 200), scale(5), area(), body(), 'nibbles']);

  const leftCounter = add([sprite('left-counter'), pos(450, 140), scale(1.3), area(), body({ isStatic: true })]);
  const rightCounter = add([sprite('right-counter'), pos(800, 145), scale(1.3), area(), body({ isStatic: true })]);
  const trashcan = add([sprite('trashcan'), pos(705, 165), scale(1.2), area(), body({ isStatic: true }), 'trash']);

  const breadTable = add([sprite('bread-table'), pos(300, 500), scale(1.2), area(), body({ isStatic: true }), 'bun']);
  const cheeseTable = add([sprite('cheese-table'), pos(500, 500), scale(1.2), area(), body({ isStatic: true }), 'cheese']);
  const meatTable = add([sprite('meat-table'), pos(700, 500), scale(1.2), area(), body({ isStatic: true }), 'meat']);
  const lettuceTable = add([sprite('lettuce-table'), pos(900, 500), scale(1.2), area(), body({ isStatic: true }), 'lettuce']);
  const pepperTable = add([sprite('pepper-table'), pos(1100, 500), scale(1.2), area(), body({ isStatic: true }), 'peppers']);

  //confetti
  const sprites = [
    "peppers",
    "cheese",
    "lettuce",
    'nibbles-back',
    'bun',
    'burger',
    'egg',
  ]

  // load elements on screen
  const confetti = () => {

    let randomX = rand(0, width())
    let particle = add([sprite(choose(sprites)), pos(randomX, 0), scale(1), area(), 'enemy', move(DOWN, 150),
      offscreen({ destroy: true })
    ])
  }
  loop(rand(1, 0.2), confetti)

  onKeyPress("space", () => {
    go("player2")
    play("home-click", {
      volume: 0.2,
    })
  });
  onKeyPress("escape", () => {
    go("home")
    play("home-click", {
      volume: 0.2,
    })
  });


})

scene("howTo", () => {

  add([
    sprite('homebg', { width: width(), height: height() }),
    scale(1),
  ])

  add([
    text('HOW TO PLAY', {
      font: 'arcade',
      size: 50,
      align: 'center',
    }),
    anchor("center"),
    pos(width() / 2, 26),
  ])

  add([
    text('Objective: \nYour goal is to assemble as many burgers as possible within the time limit. Each burger requires a bun, patty, lettuce, tomato, and cheese. Work together with your friends to tackle increasingly complex orders and deliver them before the hungry customers lose their patience!\nControls:\nUse the arrow keys (up, down, left, right) or WASD keys to move your character around the kitchen.\nCollide into ingredients to pick them up.', {
      font: 'arcade',
      size: 40,
      align: 'center',
      width: 1300,
    }),
    anchor("center"),
    pos(width() / 2, 350),

  ])

  onKeyPress("escape", () => {
    go("home")
    play("home-click", {
      volume: 0.2,
    })
  });
})

scene("easterEgg", () => {
  //background color
  setBackground(0, 0, 0)

  //background text
  add([
    text('Waddles and Nibbles were not your ordinary ducks. Underneath their seemingly\n innocent quacks and friendly demeanor lay a sinister motive. The forest animals\n had no idea that the burgers on the menu were made from duck meat – the very meat\n that belonged to their fellow kind. The two ducks, driven by a twisted\n desire for power and control, devised a plan to exploit their own species for\n their nefarious culinary pursuits.\n\n Hidden beneath the restaurant, in a damp and dimly lit cellar,\n Waddles and Nibbles conducted their gruesome operations. Ducks from all\n around the forest would mysteriously vanish, only to reappear on the menu\n as "Duck Delight Burgers." The eerie disappearance of fellow ducks\n fueled rumors and unease throughout the forest, but no one could\n ever trace the sinister source.', {
      font: 'arcade',
      size: 35,
      align: 'center',
    }),
    anchor("center"),
    pos(width() / 2, height() / 2 - 40),
  ])

  //play music
  const music = play("scary-music", {
    //changed true to false
    paused: false,
    volume: 0.45,
    loop: true
  })

  onKeyPress("m", () => music.paused = !music.paused)
  onSceneLeave(() => music.paused = true)

  //return to screen / replay
  add([
    text('Press  esc  to  go  home  or  press  space  to  restart', {
      font: 'arcade',
      size: 38,
      align: 'center'
    }),
    anchor("center"),
    pos(width() / 2, 610),
    color(180, 180, 180)
  ])


  onKeyPress("space", () => {
    go("player1")
    play("home-click", {
      volume: 0.2,
    })
  });
  onKeyPress("escape", () => {
    go("home")
    play("home-click", {
      volume: 0.2,
    })
  });

})


//starting game
go('home')
