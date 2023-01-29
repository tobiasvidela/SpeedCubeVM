'use strict';

const generator = document.getElementById('btn-generator'),
      display = document.getElementById('display');

generator.addEventListener('click',() => {
    let scramble = GenerateScramble();
    return display.innerHTML = scramble;
});

function GenerateScramble() {
    // Legal moves
    const moves = ['U','D','L','R','F','B','U2','D2','L2','R2','F2','B2',"U'","D'","L'","R'","F'","B'"];
  
    // Generate a random sequence of moves
    let scramble = '';
    let lastLayerMoved = null;
    let scrambleLenght = GetRange(17,22); // Posible lengths for the random scramble

    for (let i = 0; i < scrambleLenght; i++) {
        let move = moves[Math.floor(Math.random() * moves.length)];
        
        while (move.includes(lastLayerMoved)) {
            move = moves[Math.floor(Math.random() * moves.length)];
        };
        
        scramble += `${move} `;

        lastLayerMoved = move.substring(0,1);
    };
  
    return scramble;
}
function GetRange(min = 0,max = min*2) {
    //generate random length with the given range
    let range = Math.floor(Math.random() * (max - min + 1) + min);

    return range;
};
