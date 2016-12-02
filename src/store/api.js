export const API_URL = 'http://localhost:3000/rest/'

export const GET_BOARDS = API_URL.concat('boards/getBoardByUser/')
export const GET_BOARD = API_URL.concat('boards/getBoard/')
export const CREATE_BOARD = API_URL.concat('boards/createBoard')
export const UPDATE_BOARD = API_URL.concat('boards/updateBoard')
export const DELETE_BOARD = API_URL.concat('boards/deleteBoard/')

export const GET_LISTS = API_URL.concat('lists/getLists/')
export const CREATE_LIST = API_URL.concat('lists/createList')
export const UPDATE_LIST = API_URL.concat('lists/updateList')
export const DELETE_LIST = API_URL.concat('lists/deletList/')

export const GET_CARD = API_URL.concat('cards/getCard/')
export const CREATE_CARD = API_URL.concat('cards/createCard')
export const UPDATE_CARD = API_URL.concat('cards/updateCard')
export const DELETE_CARD = API_URL.concat('cards/deleteCard/')

export const GET_LABELS = API_URL.concat('cards/getLabels/')
export const CREATE_LABEL = API_URL.concat('cards/createCard')
export const DELETE_LABEL = API_URL.concat('cards/deleteCard/')

export const LOGIN_USER = API_URL.concat('/users/login')
export const CREATE_USER = API_URL.concat('/users/createUser')

export const GET_COLORS = API_URL.concat('/colors')
