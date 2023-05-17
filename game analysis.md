cut the rope game analysis

1. list of all the characters/elements
  -1. monster
  -2. candy
  -3. rope
  -4. the button the string is attatched to
  -5. bubbles
  -6. stars
  -7. star counter
  -8. time
  -9. mouse 
  -10. ground
  -11. background

  2. structure and behaviour of each character 
-1. monster: it will be a simple sprite object with a monster pic, the monster
    will be placed in the bottom place of the canvas on top of the ground, the 
    monster will have animations according to what is happening during the game,
    monster is a non-playing character that means that the human user will not be 
    able to control the character


-2. candy: it will be a circular body created with the help of physics engine and matter.js library, it will be placed above the monster and will also be attatched to one end of a  rope, it would fall if the rope is cut or closer to either side of the canvas (if the candy falls close to the monster, it will be removed from the world i.e. the candy will be eaten by the monster), the candy can be attatched to more than one rope


-3. rope: flexible, brown, position is dependant on where the cut button is(one end is attatched to the cut button and the other is attatched to the candy), the rope structure will be created using CONSTRAINT functionality of physics engine, 
the BODIES functionality of physics engine will be used to create rectangular bodies known as LINKS , these LINKS will be attatched together to create the rope structure

