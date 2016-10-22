import { app } from '../index.js'

export const state = {
    comp: [],
    boards: [],
    lists: {},
    cards: {}
}

export const mutations = {
    addBoards(state, boards) {
        var i
        for (i = 0; i < boards.length; i++) {
            boards[i].hash = '#board' + boards[i].id
            boards[i].param = 'board' + boards[i].id
        }

        state.comp = boards;
    },
    addBoard(state, board) {
        board.hash = '#board' + board.id
        board.param = 'board' + board.id

        state.comp.push(board)
    },
    deleteBoard(state, index) {
        state.comp.splice(index, 1)
    },
    getLists(state, payload) {
        // state.lists.push(payload.lists)
        let id = payload.boardId
        app.$set(state.lists, payload.boardId, payload.lists)
        // state.lists = { ...state.lists, id: payload.lists }
        // state.lists = Object.assign({ x }, [payload.boardId]: payload.lists);

        // state.lists[payload.boardId] = payload.lists
    },
    getCards(state, payload) {
        app.$set(state.cards, payload.listId, payload.cards)

        // state.cards[payload.listId] = payload.cards
        // state.cards = payload.cards
        // state.cards.push(payload.cards)
    }
}