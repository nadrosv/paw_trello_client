import * as types from './mutation-types'
import { app } from '../index.js'
import auth from '../auth'
import * as api from './api'


//BOARDS
export const addBoard = (context, {board}) => {
    app.$http.post(api.CREATE_BOARD, board).then((response) => {
        context.commit(types.ADD_BOARD, response.body)
        app.$store.dispatch('addActivity', { action: 'added board', element: board.board_name })
    }, (response) => {
        console.log(response)
    });
}

export const editBoard = (context, {boardData, boardName}) => {
    boardData.board_name = boardName
    app.$http.put(api.UPDATE_BOARD + boardData.id, boardData).then((response) => {
        context.commit(types.EDIT_BOARD, { boardData, boardName })
        app.$store.dispatch('addActivity', { action: 'edited list', element: boardName })

    }, (response) => {
        console.log(response)
    });
}

export const delBoard = (context, {board}) => {
    app.$http.delete(api.DEL_BOARD + context.state.activeBoard.id).then((response) => {
        context.commit(types.DEL_BOARD, { board })
        app.$store.dispatch('addActivity', { action: 'deleted board', element: board.board_name })

    }, (response) => {
        console.log(response)
    });
}

export const delList = (context, {list}) => {
    app.$http.delete(api.DEL_LIST + list.id).then((response) => {
        context.commit(types.DEL_LIST, { list })
        app.$store.dispatch('addActivity', { action: 'deleted list', element: list.list_name })

    }, (response) => {
        console.log(response)
    });
}

export const delCard = (context, {card}) => {
    app.$http.delete(api.DEL_CARD + card.id).then((response) => {
        context.commit(types.DEL_CARD, { card })
        app.$store.dispatch('addActivity', { action: 'deleted card', element: card.card_name })

    }, (response) => {
        console.log(response)
    });
}

export const getUsers = (context) => {
    return new Promise((resolve, reject) => {
        app.$http.get(api.API_URL + 'users/').then((response) => {
            resolve(response.body)
        }, (response) => {
            console.log(response)
        })
    })
}

export const getLists = (context, {boardId}) => {
    return new Promise((resolve, reject) => {

        app.$http.get(api.GET_LISTS + boardId).then((response) => {
            context.commit(types.GET_LISTS, { boardId, lists: response.body }, { silent: true })
            resolve()
        }, (response) => {
            console.log(response)
        });
    })

}

export const getCards = (context, {listId}) => {
    return new Promise((resolve, reject) => {

        app.$http.get(api.GET_CARDS + listId).then((response) => {
            context.commit(types.GET_CARDS, { listId, cards: response.body }, { silent: true })

            for (let i = 0; i < response.body.length; i++) {
                app.$store.dispatch('getFiles', { cardId: response.body[i].id })
                app.$store.dispatch('getLabels', { cardId: response.body[i].id })
                app.$store.dispatch('getComments', { cardId: response.body[i].id })

            }
            resolve()

        }, (response) => {
            console.log(response)
        });
    })
}

export const getTeams = (context, {teams}) => {
    let promises = []

    for (let i = 0; i < teams.length; i++) {
        promises.push(new Promise((resolve, reject) => {
            app.$http.get(api.API_URL + 'teams?id=' + teams[i]).
                then((response) => {
                    resolve(response.body)
                }, (response) => {
                    console.log(response)
                })
        })
        )
    }
    return Promise.all(promises)

}

export const getUserTeams = (context) => {
    return new Promise((resolve, reject) => {

        app.$http.get(api.API_URL + 'users?id=' + auth.user.id).
            then((response) => {
                context.commit('GET_USER', response.body[0])
                resolve(response.body[0].teams)
            }, (response) => {
                console.log(response)
                reject()
            })
    })

}

export const getLabelColor = (context, {colorId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get(api.GET_COLORS).then((response) => {
            resolve({ responseColor: response })

        }, (response) => {
            console.log(response)
        })
    })
}

export const getLabels = (context, {cardId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get(api.GET_LABELS + cardId).then((response) => {
            context.commit(types.GET_LABELS, { cardId, labels: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}

export const getFiles = (context, {cardId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get(api.API_URL + 'files?cardId=' + cardId).then((response) => {
            context.commit(types.GET_FILES, { cardId, files: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}

export const getGlobalLabels = (context) => {
    return new Promise((resolve, reject) => {
        app.$http.get(api.GET_LABELS).then((response) => {
            context.commit(types.GET_GLOBAL_LABELS, { labels: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}


export const getComps = (context) => {
    app.$store.dispatch('getGlobalLabels')
    app.$store.dispatch('getBoards').then(() => {
        for (let i = 0; i < app.$store.state.comp.length; i++) {
            app.$store.dispatch('getActivity', { boardId: app.$store.state.comp[i].id })
            app.$store.dispatch('getLists', { boardId: app.$store.state.comp[i].id }).then(() => {
                
                for (let j = 0; j < app.$store.state.lists[app.$store.state.comp[i].id].length; j++) {
                    app.$store.dispatch('getCards', { listId: (app.$store.state.lists[app.$store.state.comp[i].id])[j].id })
                }
            })
        }
    })
}

export const getBoard = (context, {id}) => {
    app.$store.dispatch('getGlobalLabels')
    app.$http.get(api.GET_BOARDS + id).then((response) => {
        context.commit(types.GET_BOARD, response.body)
        context.commit('setActiveBoard', { board: response.body })

        app.$store.dispatch('getActivity', { boardId: response.body.id })
        app.$store.dispatch('getLists', { boardId: response.body.id }).then(() => {

            for (let j = 0; j < app.$store.state.lists[response.body.id].length; j++) {
                app.$store.dispatch('getCards', { listId: (app.$store.state.lists[response.body.id])[j].id })
            }
        })
    })
}

export const getBoards = (context) => {
    return new Promise((resolve, reject) => {

        app.$http.get(api.GET_BOARDS + auth.user.id).then((response) => {
            app.$store.dispatch('setSharedBoards').then(() => {
                app.$store.dispatch('getSharedBoards').then((boards) => {

                    response.body.push.apply(response.body, boards)
                    context.commit(types.GET_BOARDS, response.body, { silent: true })

                    resolve()
                })
            }, (response) => {
                console.log(response)
            });
        })
    })
}

export const setSharedBoards = (context) => {
    return new Promise((resolve, reject) => {
        app.$http.get(api.API_URL + 'users?id=' + auth.user.id).then((response) => {
            context.commit(types.SET_SHARED_BOARDS, response.body[0].sharedBoards, { silent: true })
            resolve()
        }, (response) => {
            console.log(response)
        });
    })
}

export const getSharedBoards = (context) => {
    let boards = []
    let promises = []

    for (let i = 0; i < app.$store.state.sharedBoards.length; i++) {
        promises.push(new Promise((resolve, reject) => {
            app.$http.get(api.GET_BOARD + app.$store.state.sharedBoards[i]).
                then((response) => {
                    resolve(response.body[0])
                }, (response) => {
                    console.log(response)
                })
        })
        )
    }

    return Promise.all(promises)
}

export const shareBoard = (context, {board, user}) => {
    user.sharedBoards.push(board.id)
    app.$http.put(api.API_URL + 'users/' + user.id, user).then((response) => {
        app.$store.dispatch('addActivity', { action: 'shared board', element: board.board_name })
    }, (response) => {
        console.log(response)
    });
}

export const toggleFavList = (context, {list}) => {
    app.$http.put(api.EDIT_LIST + list.id, list).then((response) => {
        context.commit(types.FAV_LIST, { list })
        app.$store.dispatch('addActivity', { action: 'favourited card', element: list.list_name })

    }, (response) => {
        console.log(response)
    });
}
export const editList = (context, {list, name, pos}) => {
    app.$http.put(api.EDIT_LIST + list.id, { boardId: list.boardId, list_name: name, pos: pos }).then((response) => {
        context.commit(types.EDIT_LIST, { list, name, pos })
        app.$store.dispatch('addActivity', { action: 'edited list', element: list.list_name })
    }, (response) => {
        console.log(response)
    });
}

export const addLabel = (context, {label}) => {
    app.$http.post(api.CREATE_LABEL, label).then((response) => {
        context.commit(types.ADD_LABEL, { label: response.body })
        app.$store.dispatch('addActivity', { action: 'Add Label', element: label.name })

    }, (response) => {
        console.log(response)
    });
}

export const subCard = (context, {card}) => {
    context.commit(types.SUB_CARD, { cardId: card.id })
}

export const addFile = (context, {file}) => {
    app.$http.post(api.API_URL + 'files', file).then((response) => {
        context.commit(types.ADD_FILE, { file: file })

    }, (response) => {
        console.log(response)
    });
}

export const delLabel = (context, {label}) => {
    console.log({ label });
    app.$http.delete(api.DEL_LABEL + label.id).then((response) => {
        context.commit(types.DEL_LABEL, { label: label })
        app.$store.dispatch('addActivity', { action: 'remove label', element: label.name })

    }, (response) => {
        console.log(response)
    });
}

export const editCard = (context, {card, card_name, pos, desc, dueDate, lastChanged}) => {
    let newCard = card
    if (dueDate === undefined)
        dueDate = card.dueDate
    newCard.card_name = name
    newCard.pos = pos
    newCard.desc = desc
    app.$http.put(api.EDIT_CARD + card.id, { listId: card.listId, card_name: card_name, pos: pos, desc: desc, dueDate: dueDate, lastChanged: lastChanged }).then((response) => {
        context.commit(types.EDIT_CARD, { card, card_name, pos, desc, dueDate, lastChanged })
        console.log(response.body)
        app.$store.dispatch('addActivity', { action: 'edited card', element: card.card_name })

    }, (response) => {
        console.log(response)
    });
}

export const archiveList = (context, {list}) => {
    context.commit(types.ARCHIVE_LIST, { list })
    app.$http.put(api.EDIT_LIST + list.id, list).then((response) => {
        app.$store.dispatch('addActivity', { action: 'archived list', element: list.list_name })

    }, (response) => {
        console.log(response)
    });
}

export const archiveCard = (context, {card}) => {
    context.commit(types.ARCHIVE_CARD, { card })
    app.$http.put(api.EDIT_CARD + card.id, card).then((response) => {
        app.$store.dispatch('addActivity', { action: 'archived card', element: card.card_name })

    }, (response) => {
        console.log(response)
    });
}

export const addList = (context, {list}) => {
    app.$http.post(api.ADD_LIST, list).then((response) => {
        app.$store.dispatch('addActivity', { action: 'added list', element: list.list_name })

        context.commit(types.ADD_LIST, { list: response.body })
    }, (response) => {
        console.log(response)
    });
}

export const addCard = (context, {card}) => {
    app.$http.post(api.ADD_CARD, card).then((response) => {
        app.$store.dispatch('addActivity', { action: 'added card', element: card.card_name })
        context.commit(types.ADD_CARD, { card: response.body })
    }, (response) => {
        console.log(response)
    });
}

export const favBoard = (context, {board}) => {
    context.commit(types.FAV_BOARD, { board })
    app.$store.dispatch('addActivity', { action: 'favourited', element: board.board_name })

    app.$http.put(api.EDIT_BOARD + board.id, board).then((response) => {
        console.log(response.body)
    }, (response) => {
        console.log(response)
    });
}

export const addActivity = (context, {action, element}) => {
    let newLog = auth.user.username + " " + action + " \"" + element + "\"";

    let newActivity = {
        "boardId": app.$store.state.activeBoard.id,
        "date": new Date(),
        "log": newLog
    }

    app.$http.post(api.API_URL + 'activities', newActivity).then((response) => {
        context.commit(types.ADD_ACTIVITY, { newActivity })
    }, (response) => {
        console.log(response)
    });
}

export const getActivity = (context, {boardId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get(api.API_URL + 'activities?boardId=' + boardId).then((response) => {
            context.commit(types.GET_ACTIVITY, { boardId, activities: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}

export const getComments = (context, {cardId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get(api.API_URL + 'comments?cardId=' + cardId).then((response) => {
            context.commit(types.GET_COMMENTS, { cardId, comments: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}


export const addComment = (context, {comment}) => {
    app.$http.post(api.API_URL + 'comments', comment).then((response) => {
        context.commit(types.ADD_COMMENT, { comment: response.body })
        app.$store.dispatch('addActivity', { action: 'added comment', element: comment.text })

    }, (response) => {
        console.log(response)
    });
}

