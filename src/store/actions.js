import * as types from './mutation-types'
import { app } from '../index.js'
import auth from '../auth'

export const getBoardLists = (context, {board}) => {
    let lists = context.getters.lists
    let boardLists = lists[board.id]
    if (boardLists !== undefined) {
        let filtered = boardLists.filter(list => !list.archived)

        let sorted = filtered.sort(function (a, b) {
            if (a.pos < b.pos) return -1;
            if (a.pos > b.pos) return 1;
            return 0;
        })

        context.commit(types.SET_LISTS, { sorted })
    }

}

//BOARDS
export const addBoard = (context, {board}) => {
    app.$http.post('http://localhost:3000/boards', board).then((response) => {
        console.log('dodano board')
        context.commit(types.ADD_BOARD, response.body)
    }, (response) => {
        console.log(response)
    });
}

export const editBoard = (context, {boardData, boardName}) => {
    boardData.board_name = boardName
    app.$http.put('http://localhost:3000/boards/' + boardData.id, boardData).then((response) => {

        context.commit(types.EDIT_BOARD, { boardData, boardName })
    }, (response) => {
        console.log(response)
    });
}

export const delBoard = (context, {board}) => {
    app.$http.delete('http://localhost:3000/boards/' + context.state.activeBoard.id).then((response) => {
        context.commit(types.DEL_BOARD, { board })
    }, (response) => {
        console.log(response)
    });
}

export const getBoards = (context) => {
    app.$http.get('http://localhost:3000/boards?userId=' + auth.user.id).then((response) => {
        context.commit(types.GET_BOARDS, response.body, { silent: true })

    }, (response) => {
        console.log(response)
    });
}

export const getLists = (context, {boardId}) => {
    app.$http.get('http://localhost:3000/lists?boardId=' + boardId).then((response) => {
        context.commit(types.GET_LISTS, { boardId, lists: response.body }, { silent: true })
        //   this.lists = response.body;
    }, (response) => {
        console.log(response)
    });
}

export const toggleFavList = (context, {list}) => {
    context.commit(types.FAV_LIST, { list })
    app.$http.put('http://localhost:3000/lists/' + list.id, list).then((response) => {
    }, (response) => {
        console.log(response)
    });
}
export const editList = (context, {list, name, pos}) => {
    list.list_name = name
    list.pos = pos

    context.commit(types.EDIT_LIST, { list })
    console.log(list + ', ' + pos)
    app.$http.put('http://localhost:3000/lists/' + list.id, list).then((response) => {
        console.log(response.body)
        // context.commit(types.EDIT_LIST, { list })
    }, (response) => {
        console.log(response)
    });
}

export const archiveList = (context, {list}) => {
    context.commit(types.ARCHIVE_LIST, { list })

    app.$http.put('http://localhost:3000/lists/' + list.id, list).then((response) => {
        console.log(response.body)
        // context.commit(types.EDIT_LIST, { list })
    }, (response) => {
        console.log(response)
    });
}

export const addList = (context, {list}) => {
    app.$http.post('http://localhost:3000/lists', list).then((response) => {
        console.log('dodano liste')
        console.log(response.body)
        context.commit(types.ADD_LIST, { list: response.body })
        // this.lists.push(response.body)
    }, (response) => {
        console.log(response)
    });
}