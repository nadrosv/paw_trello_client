export const state = {
    comp: [],
    boards: [],
    lists: [],
    cards: []
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
        state.lists.push({boardId: payload.boardId, data: payload.lists})
    },
    getCards(state, payload) {
        state.cards.push({"listId": payload.listId, "data": payload.cards})
    }
}