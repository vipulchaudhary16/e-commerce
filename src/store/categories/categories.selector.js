import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
    //first -> input selector
    [selectCategoryReducer],
    //output selector
    (categoriesSlice) => categoriesSlice.categories //run only when categoriesSlice changes
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        console.log("selector called: category")
        return categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items
            return acc
        }, {})
    }
)