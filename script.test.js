import { Gameboard } from "./script"

test("Gameboard gets sizes", () => {
    let ultraBoard = Gameboard(10)
    expect(ultraBoard.getSize()).toBe(10)
})

test("Gameboard places ships", () => {
    let board = Gameboard(10)
    expect(board.placeShips().keyArray.length).toBe(4)
})

test("Gamboard doesn't place ships in the same place", () => {
    let board = Gameboard(10)
    let placements = board.placeShips().keyArray
    let placementSame = false
    for(let i = 0; i < placements.length; i++) {
        
    }
    expect(placementSame).toBe(false)
})