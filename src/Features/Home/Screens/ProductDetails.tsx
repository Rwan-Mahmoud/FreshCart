import { getProductById } from '@/Features/Products/Server/ProductsServer'
import React from 'react'
import { id } from 'zod/v4/locales'
import ProductInfo from '../Components/ProductDetails/ProductInfo'

export default async function ProductDetails({productId}:{productId:string}) {
  const response = await getProductById( {id : productId})
  return <>
  <ProductInfo product={response.data}/>
  </>
}
