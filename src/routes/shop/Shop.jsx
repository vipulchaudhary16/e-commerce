import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { CategoriesPreview } from '../categories-preview/CategoriesPreview'
import { Category } from '../category/Category'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase'
import { setCategories } from '../../store/categories/categories.slice'

export const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoriesArray = async () => {
            const categoriesArray = await getCategoriesAndDocuments()
            dispatch(setCategories(categoriesArray))
        }
        getCategoriesArray()
    }, [])
    
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}
