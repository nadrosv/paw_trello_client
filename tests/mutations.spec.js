import { mutations } from '../src/store/mutations'
import { getUser } from '../src/store/actions'
import Vue from 'vue'

const { setActiveBoard } = mutations
let oldBoard = {
  id: 1, board_name: "board1"
}
let newBoard = {
  id: 2,
  board_name: "board2"
}
let state = {
  activeBoard: oldBoard,
  user: {
    subs: [1, 2]
  }
}

describe('mutations', () => {

  it('should set active board', () => {
    mutations.setActiveBoard(state, { board: newBoard })
    expect(state.activeBoard).toEqual(newBoard)
  })

  it('should share card', () => {
    mutations.SUB_CARD(state, { cardId: 1 })
    expect(state.user.subs).toEqual([2])
  })

  
})

