const Ship = (long, damage, sunk) => {
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
    const getCoordinate = (name) => {
        let yArray = []
        let valueOfX = name.x(name)
        let upOrDown = Math.floor(Math.random() * 2)
        yArray.push(Math.floor(Math.random() * 10))
        console.log(valueOfX)
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
            return yArray
        }
        return yArray
    }
    
    return { hit, isSunk, getDamage, getLong, getSunk, getCoordinate, x } 
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
    const getSize = () => size
}


const smallShip = Ship(4, 0, false)
console.log(smallShip.getCoordinate(smallShip))