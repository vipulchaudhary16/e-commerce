import React, { useContext } from 'react'
import { CategoryPreview } from '../../components/category-preview/CategoryPreview'
import { CategoriesContext } from '../../contexts/categories.context'

export const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
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
