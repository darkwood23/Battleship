const Ship = (long, damage, sunk) => {
    const hit = () => { damage += 1 }
    const isSunk = () => { if (long === damage) { sunk = true } }
    const x = () => { 
        let lengthArray = []
        let choice = Math.floor(Math.random() * 2)
        let secondChoice = Math.floor(Math.random() * 3)
        lengthArray.push(Math.floor(Math.random() * 10) )
        return lengthArray
    }
    const y = () => {

        Math.floor(Math.random() * 10) 
    }
    const getLong = () => long
    const getDamage = () => damage
    const getSunk = () => sunk

    return { hit, isSunk, getDamage, getLong, getSunk, x, y }
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
console.log(smallShip.x())