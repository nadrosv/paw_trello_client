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

export const delList = (context, {list}) => {
    app.$http.delete('http://localhost:3000/lists/' + list.id).then((response) => {
        context.commit(types.DEL_LIST, { list })
    }, (response) => {
        console.log(response)
    });
}

export const delCard = (context, {card}) => {
    app.$http.delete('http://localhost:3000/cards/' + card.id).then((response) => {
        context.commit(types.DEL_CARD, { card })
    }, (response) => {
        console.log(response)
    });
}


export const getBoards = (context) => {
    return new Promise((resolve, reject) => {

        app.$http.get('http://localhost:3000/boards?userId=' + auth.user.id).then((response) => {
            context.commit(types.GET_BOARDS, response.body, { silent: true })
            resolve()
        }, (response) => {
            console.log(response)
        });
    })
}

export const getLists = (context, {boardId}) => {
    return new Promise((resolve, reject) => {

        app.$http.get('http://localhost:3000/lists?boardId=' + boardId).then((response) => {
            context.commit(types.GET_LISTS, { boardId, lists: response.body }, { silent: true })
            //   this.lists = response.body;
            resolve()

        }, (response) => {
            console.log(response)
        });
    })

}

export const getCards = (context, {listId}) => {
    return new Promise((resolve, reject) => {

        app.$http.get('http://localhost:3000/cards?listId=' + listId).then((response) => {
            context.commit(types.GET_CARDS, { listId, cards: response.body }, { silent: true })
            //   this.lists = response.body;
            resolve()

        }, (response) => {
            console.log(response)
        });
    })

}

export const getComps = (context) => {
    app.$store.dispatch('getBoards').then(() => {
        for (let i = 0; i < app.$store.state.comp.length; i++) {
            app.$store.dispatch('getLists', { boardId: app.$store.state.comp[i].id }).then(() => {
                for (let j = 0; j < app.$store.state.lists[app.$store.state.comp[i].id].length; j++) {
                    // console.log((app.$store.state.lists[app.$store.state.comp[i].id])[j].id)
                    app.$store.dispatch('getCards', { listId: (app.$store.state.lists[app.$store.state.comp[i].id])[j].id })
                }
            })
        }
    })
}

export const toggleFavList = (context, {list}) => {
    context.commit(types.FAV_LIST, { list })
    app.$http.put('http://localhost:3000/lists/' + list.id, list).then((response) => {
    }, (response) => {
        console.log(response)
    });
}
export const editList = (context, {list, name, pos}) => {
    // let newList = {...list, list_name: name, pos: pos}

    app.$http.put('http://localhost:3000/lists/' + list.id, { boardId: list.boardId, list_name: name, pos: pos }).then((response) => {
        context.commit(types.EDIT_LIST, { list, name, pos })
        console.log(response.body)
    }, (response) => {
        console.log(response)
    });
}

export const editCard = (context, {card, name, desc}) => {
    // console.log(editedCard)
    app.$http.put('http://localhost:3000/cards/' + card.id, { listId: card.listId, card_name: name, desc: desc }).then((response) => {
        // console.log(response.body)
        context.commit(types.EDIT_CARD, { card, name, desc })
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
    }, (response) => {
        console.log(response)
    });
}

export const addCard = (context, {card}) => {
    app.$http.post('http://localhost:3000/cards', card).then((response) => {
        console.log('dodano karte')
        console.log(response.body)
        context.commit(types.ADD_CARD, { card: response.body })
    }, (response) => {
        console.log(response)
    });
}

export const favBoard = (context, {board}) => {
    context.commit(types.FAV_BOARD, { board })

    app.$http.put('http://localhost:3000/boards/' + board.id, board).then((response) => {
        console.log(response.body)
    }, (response) => {
        console.log(response)
    });
}

