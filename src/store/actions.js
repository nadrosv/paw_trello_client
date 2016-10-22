import * as types from './mutation-types'
import { app } from '../index.js'
import auth from '../auth'


export const editBoard = (context, {boardData, boardName}) => {
    boardData.board_name = boardName
    app.$http.put('http://localhost:3000/boards/' + boardData.id, boardData).then((response) => {

        context.commit(types.EDIT_BOARD, { boardData, boardName })
    }, (response) => {
        console.log(response)
    });
}

export const delBoard = (context, {board}) => {
    app.$http.delete('http://localhost:3000/boards/' + state.activeBoard.id).then((response) => {
        context.commit(types.DEL_BOARD, { board })
    }, (response) => {
        console.log(response)
    });
}

export const getComponents = (context) => {
    app.$http.get('http://localhost:3000/boards?userId=' + auth.user.id).then((response) => {
        context.commit(types.ADD_BOARD, response.body, { silent: true })

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