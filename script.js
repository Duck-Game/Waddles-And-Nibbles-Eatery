kaboom();

setGravity(500);

// add([text('Welcome to Wadlles and nibbles eatery'), pos(400, 80)]);
loadSprite('bean', 'rat.png');

// add something to screen
const bean = add([sprite('bean'), pos(80, 40), area(), body()]);

onKeyPress('space', () => {
  bean.jump();
});

add([
  rect(width(), 48),
  pos(0, height() - 48),
  outline(4),
  area(),
  body({ isStatic: true }),
  color(127, 200, 255),
]);
