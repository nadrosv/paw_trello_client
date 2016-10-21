export const state = {
    comp: []
}

export const mutations = {
    addBoards(state, boards) {
        var i
        for (i = 0; i < boards.length; i++) {
            boards[i].hash = '#board' + boards[i].id;
            boards[i].param = 'board' + boards[i].id;
        }
        
        state.comp = boards;
    },
    addBoard(state, board) {
        board.hash = '#board' + board.id;
        board.param = 'board' + board.id;

        state.comp.push(board);
    }
}