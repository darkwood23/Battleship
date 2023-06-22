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
    expect(board.isDuplicate([
        [[1,2,3], [1]],
        [[4,5,6],[7,8]],
        [[1,2], [8]]
    ])).toBe(false)
    expect(placementSame).toBe(false)
})