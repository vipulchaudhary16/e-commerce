import { createContext, useEffect, useState } from "react";
import PRODUCTS from '../utils/shop-data.js'

import {addCollectionAndDocuments, getCategoriesAndDocuments} from '../utils/firebase/fireabase'

export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setcategoriesMap] = useState({})
    const value = { categoriesMap }

    useEffect(() => {
        // addCollectionAndDocuments('categories', PRODUCTS) //! just run for one time
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setcategoriesMap(categoryMap)
        }
        getCategoryMap( )
    }, [])

    return <CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>
}