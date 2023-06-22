const Ship = (long, damage, sunk) => {
    let masterArray = []
    const getCoordinates = () => {return masterArray}
    const hit = () => { damage += 1 }
    const isSunk = () => { if (long === damage) { sunk = true } }
    const getLong = () => long
    const getDamage = () => damage
    const getSunk = () => sunk
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
    
    return { hit, isSunk, getDamage, getLong, getSunk, getNewCoordinate, x, getCoordinates } 
}

const Gameboard = (size) => {
    let missedShots = 0
    const receiveAttack = (x, y, target) => {
        if (x === target.x() && y === target.y()) {
            target.hit()
        } else {
            missedShots += 1
        }
    }

    const isDuplicate = (array) => {
        let xArray = []
        let yArray = []
        let testArrayX = []
        let testArrayY = []
        let tryAgain = [[],[]]

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

        
        let valuSoFarO = []
        for(let i = 0; i < testArrayX.length; ++i) {
            if(valuSoFarO.indexOf(testArrayX[i]) !== -1 ) {
                tryAgain[0].push(true)
                for(let u = 0; u < testArrayY.length; ++u) {

                }
            } else {
                valuSoFarO.push(testArrayX[i])
            }
        }
    
        let valuSoFar = []
        for(let i = 0; i < testArrayY.length; i++) {
            if(valuSoFar.indexOf(testArrayY[i]) !== -1)  {
                tryAgain[1].push(true)
            } else {
                valuSoFar.push(testArrayY[i])
            }
        }
        console.log(testArrayX)
        console.log(testArrayY)
        console.log(tryAgain.length)
        console.log(tryAgain)
        console.log(array)
        if(tryAgain[0].length >= 2 && tryAgain[1].length >= 2) {
            return true
        } else {
            return false
        }
    }

    const placeShips = (name) => {
        let keyArray = []

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

        
        console.log(isDuplicate(keyArray))
        return { keyArray }
        
    }
    const getSize = () => size

    return { receiveAttack, placeShips, getSize, isDuplicate}
}

export { Gameboard }


const game = Gameboard(10)
console.log(game.placeShips(game))
