import { app } from '../index.js'
import auth from '../auth'

export const state = {
    comp: [],
    boards: [],
    lists: {},
    cards: {},
    activeBoard: {},
    activeList: {},
    activeCard: {}
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
    },
    editBoard(state, {boardData, boardName}) {
        boardData.board_name = boardName
    },
    delBoard(state, {board}) {
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
    }
}
export const actions = {

    editBoard(context, {boardData, boardName}) {
        boardData.board_name = boardName
        app.$http.put('http://localhost:3000/boards/' + boardData.id, boardData).then((response) => {

            context.commit('editBoard', { boardData, boardName })
        }, (response) => {
            console.log(response)
        });
    },
    delBoard(context, {board}) {
        app.$http.delete('http://localhost:3000/boards/' + board.id).then((response) => {
            context.commit('delBoard', { board })
        }, (response) => {
            console.log(response)
        });
    },
    getComponents(context) {
        app.$http.get('http://localhost:3000/boards?userId=' + auth.user.id).then((response) => {
            this.$store.commit('addBoards', response.body, { silent: true })


        }, (response) => {
            console.log(response)
        });
    }
}

export const getters = {
    activeBoard: state => state.activeBoard,
    activeList: state => state.activeList,
    activeCard: state => state.activeCard
}


