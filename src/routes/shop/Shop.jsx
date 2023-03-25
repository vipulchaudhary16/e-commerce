import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CategoriesPreview } from '../categories-preview/CategoriesPreview'

export const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
        </Routes>
    )
}
