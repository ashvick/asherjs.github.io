let c = document.getElementById("life");
let parent = document.querySelector('.welcome');
let parentHeight = parent.offsetHeight;
let parentWidth = parent.offsetWidth;
c.style.width = parentWidth.toString() + 'px';
c.style.height = parentHeight.toString() + 'px';
c.width = parentWidth / 12;
c.height = parentHeight / 12;
let gridHeight = c.offsetHeight;
let gridWidth = c.offsetWidth;
let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;
let ctx = c.getContext("2d");
ctx.fillStyle = "#fafafa";

export function startLife() {

    let theGrid = createArray(gridWidth);
    let mirrorGrid = createArray(gridWidth);

    function createArray(rows) { //creates a 2 dimensional array of required height
        let arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
        }
        return arr;
    }

    function fillRandom() {
        for (let j = 1; j < 120; j++) {
            for (let k = 1; k < 240; k++) {
                theGrid[j][k] = Math.round(Math.random()-0.35);
            }
        }
    }

    function drawGrid() {
        let liveCount = 0;
        ctx.clearRect(0, 0, gridHeight, gridWidth);
        for (let j = 1; j < gridHeight; j++) {
            for (let k = 1; k < gridWidth; k++) {
                if (theGrid[j][k] === 1) {
                    ctx.fillRect(j, k, 1, 1);
                    liveCount++;

                }
            }
        }
    }

    function updateGrid() { //perform one iteration of grid update

        for (let j = 1; j < gridHeight - 1; j++) {
            for (let k = 1; k < gridWidth - 1; k++) {
                let totalCells = 0;
                //add up the total values for the surrounding cells
                totalCells += theGrid[j - 1][k - 1]; //top left
                totalCells += theGrid[j - 1][k]; //top center
                totalCells += theGrid[j - 1][k + 1]; //top right

                totalCells += theGrid[j][k - 1]; //middle left
                totalCells += theGrid[j][k + 1]; //middle right

                totalCells += theGrid[j + 1][k - 1]; //bottom left
                totalCells += theGrid[j + 1][k]; //bottom center
                totalCells += theGrid[j + 1][k + 1]; //bottom right

                //apply the rules to each cell
                switch (totalCells) {
                    case 2:
                        mirrorGrid[j][k] = theGrid[j][k];

                        break;
                    case 3:
                        mirrorGrid[j][k] = 1;

                        break;
                    default:
                        mirrorGrid[j][k] = 0;
                }
            }
        }

        //mirror edges to create wraparound effect

        for (let l = 1; l < gridHeight - 1; l++) { //iterate through rows
            //top and bottom
            mirrorGrid[l][0] = mirrorGrid[l][gridHeight - 3];
            mirrorGrid[l][gridHeight - 2] = mirrorGrid[l][1];
            //left and right
            mirrorGrid[0][l] = mirrorGrid[gridHeight - 3][l];
            mirrorGrid[gridHeight - 2][l] = mirrorGrid[1][l];

        }

        //swap grids
        let temp = theGrid;
        theGrid = mirrorGrid;
        mirrorGrid = temp;
    }

    fillRandom();

    startAnimate(2);

    function startAnimate(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
    }

    function animate() {
        if (stop) {
            return;
        }
        requestAnimationFrame(animate);

        now = Date.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {

            then = now - (elapsed % fpsInterval);

            drawGrid();
            updateGrid();

            // TESTING...Report #seconds since start and achieved fps.
            let sinceStart = now - startTime;
            let currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
            //console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");

        }
    }
}