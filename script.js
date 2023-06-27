const Ship = (long, damage, sunk) => {
    let masterArray = []
    const getCoordinates = () => {return masterArray}
    const hit = () => {
        if(damage < long) {
            damage += 1;
            isSunk() 
        } 
        
    }
    const isSunk = () => { if (long === damage) { sunk = true; return sunk } }
    const getLong = () => long
    const getDamage = () => damage
    const x = (name) => { 
        let xArray = []
        let choice = Math.floor(Math.random() * 2)
        
        let secondChoice = Math.floor(Math.random() * 2)
        xArray.push(Math.floor(Math.random() * 10) )
        
        if(choice === 0) {
            return xArray
        } else {
            if (secondChoice === 0 && xArray[0] + name.getLong() <= 10) {
                for(let i = 1; i < name.getLong(); i++) {
                    xArray.push(xArray[0] + i)
                }
            } else if(secondChoice === 1 && xArray[0] - name.getLong() >= -1){
                for(let i = 1; i < name.getLong(); i++) { 
                    xArray.push(xArray[0] - i)
                }
            }
        }

        if(xArray[-1] > 10) {
            return "Error"
        }
        
        return xArray
    }
    const getNewCoordinate = (name) => {
        let yArray = []
        let valueOfX = name.x(name)
        masterArray.push(valueOfX)
        let upOrDown = Math.floor(Math.random() * 2)
        yArray.push(Math.floor(Math.random() * 10))
        if(valueOfX.length === 1) {
            if(upOrDown === 0 && yArray[0] + name.getLong() <= 10) {
                for(let i = 1; i < name.getLong(); i++) {
                    yArray.push(yArray[0] + i)
                }
            } else if (upOrDown === 1 && yArray[0] - name.getLong() >= -1) {
                for(let i = 1; i < name.getLong(); i++) {
                    yArray.push(yArray[0] - i)
                }
            }
        } else {
            masterArray.push(yArray)
            return masterArray
        }
        masterArray.push(yArray)
        return masterArray
    }
    
    return { hit, isSunk, getDamage, getLong, getNewCoordinate, x, getCoordinates } 
}

const Gameboard = (size) => {
    let missedShots = 0
    const getMissedShots = () => missedShots
    let keyArray

    const receiveAttack = (x, y, name) => {
        let hit = 0
        let hitNotes

        let shipNames = [name.verySmall, name.small, name.medium, name.large]
        for(let ships = 0; ships < shipNames.length; ships++) {
            for(let i = 0; i < shipNames[ships][0][0].length; i++) {
                if(shipNames[ships][0][i] === x) {
                    for(let u = 0; u < shipNames[ships][0][1].length; u++) {
                        if(shipNames[ships][1][i] === y) {
                            hit++
                            hitNotes=shipNames[ships]
                        }
                    }
                }
            }
        }
        for(let i = 0; i < shipNames.length; i++) {
            
            if(shipNames[i][1] === hitNotes) {
                shipNames[i][1].hit()

                if(shipNames[i][1].isSunk() === true) {
                    if(win(shipNames) === true) {
                        return "You have won the game"
                    }
                    console.log("Ship has been sunk")
                }
            }
        }

        if(hit === 0) {
            missedShots++
            return false
        } else {
            return true
        }


    }

    const win = (array) => {
        let newArray = []
        for(let i = 0; i < array.length; i++) {
            if(array[i][1].isSunk() === true) {
                newArray.push(true)
            }
        }

        if(newArray.length === array.length) {
            return true
        }
    }

    const returnTestArrays = (array) => {
        let xArray = []
        let yArray = []
        let testArrayX = []
        let testArrayY = []

        for(let i = 0; i < array.length; i++) {
            xArray.push(array[i][0])
            yArray.push(array[i][1])
        }

        for(let u = 0; u < xArray.length; u++) {
            for(let uu = 0; uu < xArray[u].length; uu++) {
                testArrayX.push(xArray[u][uu])
            }
        }

        for(let u = 0; u < yArray.length; u++) {
            for(let uu = 0; uu < yArray[u].length; uu++) {
                testArrayY.push(yArray[u][uu])
            } 
        }

        return { testArrayX, testArrayY}
    }

    const isDuplicate = (array) => {
        let tryAgain = []
        let testX = returnTestArrays(array).testArrayX
        let testY = returnTestArrays(array).testArrayY

        let valuSoFarO = []
        for(let i = 0; i < testX.length; ++i) {
            if(valuSoFarO.indexOf(testX[i]) != -1 ) {
                tryAgain.push(true)
            } else {
                valuSoFarO.push(testX[i])
            }
        }
    
        let valuSoFar = []
        for(let i = 0; i < testY.length; i++) {
            if(valuSoFar.indexOf(testY[i]) !== -1)  {
                tryAgain.push(true)
            } else {
                valuSoFar.push(testY[i])
            }
        }
        if(tryAgain.length >= 2) {
            return true
        } else {
            return false
        }
    }

    const placeShips = (name) => {
        keyArray = []

        const verySmall = Ship(1, 0, false)
        const small = Ship(3, 0, false)
        const medium = Ship(2, 0, false)
        const large = Ship(5, 0, false)

        let verySmallCoord = verySmall.getNewCoordinate(verySmall)
        let smallCoord = small.getNewCoordinate(small)
        let mediumCoord = medium.getNewCoordinate(medium)
        let largeCoord = large.getNewCoordinate(large)

        keyArray.push(verySmall.getCoordinates())
        keyArray.push(small.getCoordinates())
        keyArray.push(medium.getCoordinates())
        keyArray.push(large.getCoordinates())

        if(isDuplicate(keyArray) === true) {
            name.placeShips(name)
        }

        let keyDict = {
            verySmall: [verySmall.getCoordinates(), verySmall],
            small: [small.getCoordinates(), small],
            medium: [medium.getCoordinates(), medium],
            large: [large.getCoordinates(), large],
        }

        return { keyArray, keyDict }
        
    }
    const getSize = () => size

    return { receiveAttack, placeShips, getSize, isDuplicate, getMissedShots}
}

export { Gameboard }

// const game = Gameboard(10)
// let ships = game.placeShips(game)
// console.log(ships)
// console.log(game.receiveAttack(3, 5, ships.keyDict))
// console.log(game.receiveAttack(4, 2, ships.keyDict))
// console.log(game.getMissedShots())


const Player1 = Gameboard(10)
let ships = Player1.placeShips(Player1)
console.log(ships)
console.log(Player1.receiveAttack(3, 5, ships.keyDict))


const Player2 = Gameboard(10)
let shipsTwo = Player2.placeShips(Player2)
console.log(shipsTwo)
console.log(Player2.receiveAttack(6, 7, shipsTwo.keyDict))
