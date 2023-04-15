import React from 'react'
import { CategoryPreview } from '../../components/category-preview/CategoryPreview'
import { useSelector } from 'react-redux'
import { selectCategoryMap } from '../../store/categories/categories.selector'

export const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoryMap)
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
