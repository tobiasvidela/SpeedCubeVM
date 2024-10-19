'use strict';

// -------------------------------------------------
// ---------------------- DOM ----------------------
// -------------------------------------------------
const generator = document.querySelector('#btn-generator'),
      cubeType = document.querySelector('#cube-type'),
      display = document.querySelector('#display');

generator.addEventListener('click',() => {
    let scramble = GenerateScramble(cubeType.value);
    return display.innerHTML = scramble;
});

// -------------------------------------------------
// -------------------- CLASSES --------------------
// -------------------------------------------------
// --------- CUBES -----------
class cube {
    constructor (type, min = 0, max = 2 * min) {
        this.moves = this.movements(type);
        this.min = min;
        this.max = max;
    };

    movements(type) {
        let list = [];
        switch (type) {
            case '2x2':
                list = ["F","F2","F'","U","U2","U'","R","R2","R'"];
                break;
            case '4x4':
            case '5x5':
                list = ["F","F2","F'","Fw","Fw2","Fw'",
                        "B","B2","B'","Bw","Bw2","Bw'",
                        "U","U2","U'","Uw","Uw2","Uw'",
                        "D","D2","D'","Dw","Dw2","Dw'",
                        "R","R2","R'","Rw","Rw2","Rw'",
                        "L","L2","L'","Lw","Lw2","Lw'"
                    ];
                break;
            case '6x6':
            case '7x7':
                list = ["F","F2","F'","Fw","Fw2","Fw'","3Fw","3Fw2","3Fw'",
                        "B","B2","B'","Bw","Bw2","Bw'","3Bw","3Bw2","3Bw'",
                        "U","U2","U'","Uw","Uw2","Uw'","3Uw","3Uw2","3Uw'",
                        "D","D2","D'","Dw","Dw2","Dw'","3Dw","3Dw2","3Dw'",
                        "R","R2","R'","Rw","Rw2","Rw'","3Rw","3Rw2","3Rw'",
                        "L","L2","L'","Lw","Lw2","Lw'","3Lw","3Lw2","3Lw'"
                    ];
                break;
            default:
                list = ["U","D","L","R","F","B","B","D2","L2","R2","F2","B2","U'","D'","L'","R'","F'","B'"];
                break;
        }
        return list;
    };
    range() {
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    };
};
// ---- NxN Cubes ----
const cube2x2 = new cube('2x2',8,11);
const cube3x3 = new cube('3x3',17,25);
const cube4x4 = new cube('4x4',40,45);
const cube5x5 = new cube('5x5',50,53);
const cube6x6 = new cube('6x6',60,62);
const cube7x7 = new cube('7x7',70,71);

// -------------------------------------------------
// ------------------- FUNCTIONS -------------------
// -------------------------------------------------
function GenerateScramble(selectedCube) {

    //select the cube to scramble
    let cubeSelected;

    switch (selectedCube) {
        case '2x2':
            cubeSelected = cube2x2;
            break;
        case '4x4':
            cubeSelected = cube4x4;
            break;
        case '5x5':
            cubeSelected = cube5x5;
            break;
        case '6x6':
            cubeSelected = cube6x6;
            break;
        case '7x7':
            cubeSelected = cube7x7;
            break;
        default:
            cubeSelected = cube3x3;
            break;
    };

    // Legal moves
    const moves = cubeSelected.moves;
  
    // Generate a random sequence of moves
    let scramble = '';
    let lastLayerMoved = null;
    let scrambleLenght = cubeSelected.range(); // Posible lengths for the random scramble

    for (let i = 0; i < scrambleLenght; i++) {
        let move = moves[Math.floor(Math.random() * moves.length)];
        
        while (move.includes(lastLayerMoved)) {
            move = moves[Math.floor(Math.random() * moves.length)];
        };
        
        scramble += `${move} `;

        lastLayerMoved = move.substring(0,1);
    };
  
    return scramble;
};
