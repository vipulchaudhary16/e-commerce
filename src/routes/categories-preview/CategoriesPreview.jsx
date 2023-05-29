import React from 'react'
import { CategoryPreview } from '../../components/category-preview/CategoryPreview'
import { useSelector } from 'react-redux'
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/categories.selector'
import { Spinner } from '../../components/spinner/Spinner'

export const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    return (
        <>
            {isLoading ? <Spinner /> :
                (Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return <CategoryPreview key={title} products={products} title={title} />
                }))
            }
        </>
    )
}
