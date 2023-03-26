import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/ProductCard'
import { CategoriesContext } from '../../contexts/categories.context'
import './category.styles.scss'

export const Category = () => {
    const { category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext)
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
