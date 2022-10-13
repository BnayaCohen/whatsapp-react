import { itemService } from "../../services/itemService"


export function loadItems() {

    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().itemModule
            const items = await itemService.getItems(filterBy)
            dispatch({ type: 'SET_ITEMS', items })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadItem(itemId) {

    return async (dispatch) => {
        try {
            const item = await itemService.getItemById(itemId)
            dispatch({ type: 'SET_ITEM', item })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeItem(itemId) {

    return async (dispatch, getState) => {
        try {
            const item = await itemService.deleteItem(itemId)
            dispatch({ type: 'REMOVE_ITEM', itemId })
            return item
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {

    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}