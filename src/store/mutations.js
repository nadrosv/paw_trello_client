import { app } from '../index.js'
import auth from '../auth'
import * as types from './mutation-types'


export const state = {
    sharedBoards: {},
    user: {},
    comp: [],
    boards: [],
    lists: {},
    cards: {},
    activeBoard: {},
    activeList: {},
    activeCard: {},
    activities: {},
    comments: {},
    boardLists: [],
    labels: {},
    files: {},
    globalLabels: []
}

// we can use the ES2015 computed property name feature
// to use a constant as the function name
export const mutations = {
    [types.GET_USER](state, user) {
        state.user = user
    },
    [types.SET_SHARED_BOARDS](state, sharedBoards) {
        state.sharedBoards = sharedBoards
    },
    [types.GET_GLOBAL_LABELS](state, {labels}) {
        state.globalLabels = labels
    },

    [types.GET_BOARDS](state, boards) {
        var i
        for (i = 0; i < boards.length; i++) {
            boards[i].hash = '#board' + boards[i].id
            boards[i].param = 'board' + boards[i].id
        }

        state.comp = boards;
        state.activeBoard = state.comp[0]

    },
    [types.GET_LISTS](state, payload) {
        let id = payload.boardId
        payload.lists.sort(function (a, b) {
            if (a.pos < b.pos) return -1;
            if (a.pos > b.pos) return 1;
            return 0;
        })
        app.$set(state.lists, payload.boardId, payload.lists)

    },
    [types.GET_CARDS](state, payload) {
        payload.cards.sort(function (a, b) {
            if (a.pos < b.pos) return -1;
            if (a.pos > b.pos) return 1;
            return 0;
        })
        app.$set(state.cards, payload.listId, payload.cards)
    },

    [types.GET_ACTIVITY](state, payload) {
        app.$set(state.activities, payload.boardId, payload.activities)
    },
    [types.GET_LABELS](state, payload) {
        app.$set(state.labels, payload.cardId, payload.labels)
    },
    [types.GET_FILES](state, payload) {
        app.$set(state.files, payload.cardId, payload.files)
    },
    [types.ADD_BOARD](state, board) {
        board.hash = '#board' + board.id
        board.param = 'board' + board.id

        state.comp.push(board)
        state.activeBoard = board
    },

    [types.EDIT_BOARD](state, {boardData, boardName}) {
        boardData.board_name = boardName
    },
    [types.DEL_BOARD](state, {board}) {
        state.comp.splice(state.comp.indexOf(state.activeBoard), 1)
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
    [types.EDIT_LIST](state, {list, name, pos}) {
        list.list_name = name
        list.pos = pos
    },
    [types.EDIT_CARD](state, {card, name, pos, desc}) {
        card.card_name = name
        card.desc = desc
        card.pos = pos
    },
    // [types.ADD_LABEL](state, {card, label}) {
    //     card.labels = label
    // },
    [types.ADD_LABEL](state, {label}) {
        state.labels[label.cardId].push(label)
    },
    [types.ADD_FILE](state, {file}) {
        state.files[file.cardId].push(file)
    },
    [types.ARCHIVE_LIST](state, {list}) {
        list.archived = !list.archived
    },
    [types.ARCHIVE_CARD](state, {card}) {
        card.archived = !card.archived
    },
    [types.SET_LISTS](state, {lists}) {
        state.boardLists = lists
    },
    [types.ADD_LIST](state, {list}) {
        state.lists[list.boardId].push(list)
        app.$set(state.cards, list.id, [])


    },
    [types.ADD_CARD](state, {card}) {
        state.cards[card.listId].push(card)
        app.$set(state.labels, card.id, [])
        app.$set(state.comments, card.id, [])


    },
    [types.ADD_COMMENT](state, {comment}) {
        state.comments[comment.cardId].push(comment)
    },
    [types.ADD_ACTIVITY](state, payload) {
        state.activities[state.activeBoard.id].push(payload.newActivity)
    },
    [types.FAV_BOARD](state, {board}) {
        board.favourite = !board.favourite
    },
    [types.DEL_LIST](state, {list}) {
        state.lists[list.boardId].splice(state.lists[list.boardId].indexOf(list), 1)
    },
    [types.DEL_CARD](state, {card}) {
        state.cards[card.listId].splice(state.cards[card.listId].indexOf(card), 1)
    },
    [types.GET_COMMENTS](state, payload) {
        app.$set(state.comments, payload.cardId, payload.comments)

    }
}

export const getters = {
    activeBoard: state => state.activeBoard,
    activeList: state => state.activeList,
    activeCard: state => state.activeCard,
    lists: state => state.lists,
}


