import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/ProductCard'
import './category.styles.scss'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/categories.selector'

export const Category = () => {
    const { category } = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products && products.map(product => <ProductCard product={product} key={product.id} />)}
            </div>
        </>
    )
}
