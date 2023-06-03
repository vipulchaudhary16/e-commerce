import { all, call, put, takeLatest } from "redux-saga/effects"
import { getCategoriesAndDocuments } from "../../utils/firebase/fireabase"
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./categories.action"
import { CATEGORIES_ACTION_TYPES } from "./categories.types"

//generator
export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield call(getCategoriesAndDocuments, '') //2nd args is parameter to function at 1st args
		yield put(fetchCategoriesSuccess(categoriesArray)) //dispatch --> put
	} catch (error) {
		yield put(fetchCategoriesFailed(error))
	}
}

export function* onFetchCategories() {
	yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
	yield all([call(onFetchCategories)])
}