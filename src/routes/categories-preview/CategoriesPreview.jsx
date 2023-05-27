import React from 'react'
import { CategoryPreview } from '../../components/category-preview/CategoryPreview'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/categories.selector'

export const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    return (
        <>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return <CategoryPreview key={title} products={products} title={title} />
                })
            }
        </>
    )
}
