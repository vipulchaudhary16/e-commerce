import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { CategoriesPreview } from '../categories-preview/CategoriesPreview'
import { Category } from '../category/Category'
import { fetchCategoriesAsync } from '../../store/categories/categories.action'

export const Shop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCategoriesAsync())
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}
