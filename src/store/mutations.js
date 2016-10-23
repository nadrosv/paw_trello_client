import { app } from '../index.js'
import auth from '../auth'
import * as types from './mutation-types'


export const state = {
    comp: [],
    boards: [],
    lists: {},
    cards: {},
    activeBoard: {},
    activeList: {},
    activeCard: {},
    boardLists: []
}

// we can use the ES2015 computed property name feature
// to use a constant as the function name
export const mutations = {
    addBoards(state, boards) {
        var i
        for (i = 0; i < boards.length; i++) {
            boards[i].hash = '#board' + boards[i].id
            boards[i].param = 'board' + boards[i].id
        }

        state.comp = boards;

    },
    [types.ADD_BOARD](state, board) {
        board.hash = '#board' + board.id
        board.param = 'board' + board.id

        state.comp.push(board)
        state.activeBoard = board
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
    },
    [types.EDIT_BOARD](state, {boardData, boardName}) {
        boardData.board_name = boardName
    },
    [types.DEL_BOARD](state, {board}) {
        state.comp.splice(state.comp.indexOf(state.activeBoard), 1)
        // state.comp.splice(state.comp.indexOf(board), 1)
    },
    setActiveBoard(state, {board}) {
        state.activeBoard = board
    },
    setActiveList(state, {list}) {
        state.activeList = list
    },
    setActiveCard(state, {card}) {
        state.activeCard = card
    },
    [types.FAV_LIST](state, {list}) {
        list.favourite = !list.favourite
    },
    [types.EDIT_LIST](state, {list}) {
        // app.$set(state.lists, list.boardId, list)

    },
    [types.ARCHIVE_LIST](state, {list}) {
        list.archived = true
    },
    [types.SET_LISTS](state, {lists}) {
        state.boardLists = lists
    },
    [types.ADD_LIST](state, {list}) {
        app.$set(state.lists, list.boardId, list)

        // state.lists.push(board)

    },

}

export const getters = {
    activeBoard: state => state.activeBoard,
    activeList: state => state.activeList,
    activeCard: state => state.activeCard,
    lists: state => state.lists
}


