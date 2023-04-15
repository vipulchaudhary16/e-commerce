import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { CategoriesPreview } from '../categories-preview/CategoriesPreview'
import { Category } from '../category/Category'
import { getCategoriesAndDocuments } from '../../utils/firebase/fireabase'
import { setCategoriesMap } from '../../store/categories/categories.action'

export const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            dispatch(setCategoriesMap(categoryMap))
        }
        getCategoryMap()
    }, [])
    
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}
