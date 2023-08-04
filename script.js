kaboom();


loadSprite('rat', 'rat.png');
loadSprite('cheese', 'cheese.png')

const rat = add([sprite('rat'), pos(80, 40), area(), body()]);


onKeyDown('right', () => {
  // rat.use(sprite('cheese'))
  rat.move(120, 0)
});

onKeyDown('left', () => {
  rat.move(-120, 0)
});

onKeyDown('up', () => {
  rat.move(0, -120)
});

onKeyDown('down', () => {
  rat.move(0, 120)
});

const cheese = add([sprite('cheese'), pos(300, 40), area(), body({ isStatic: true }), 'cheese']);





//random order
let foods = ['cheese', 'meat', 'lettuce', 'pickles'] 

const randomArray = (length) => {
  let arr = ['bun'];
  
  for(let i = 1;  i < length; i++) {
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

//
rat.onCollide("cheese", () => {
   duckContainer.push('cheese')
   if(duckContainer.toString() === empty.toString()) {
     score++
   }
   
   debug.log(score)
});

// debug.log(duckContainer)