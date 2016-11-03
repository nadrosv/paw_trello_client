import { expect } from 'chai'
import { mutations } from './mutations'

const { setActiveBoard } = mutations

let oldBoard = {
    id: 1, board_name: "board1"
}
let newBoard = {
    id: 2,
    board_name: "board2"
}

describe('mutations', () => {
  it('SET_ACTIVE_BOARD', () => {
    // mock state
    const state = { activeBoard: {oldBoard} }
    // apply mutation
    setActiveBoard(state, {newBoard})
    // assert result
    expect(state.activeBoard).to.equal(newBoard)
  })
})

