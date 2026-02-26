import ProductDetails from "@/Features/Home/Screens/ProductDetails";
import { string } from "zod";


type productDetailsProps  = {
    params:Promise<{id:string}>
}
export default async function productDetails ({params}:productDetailsProps){
    const {id} = await params
    return <>
    <ProductDetails productId={id}/>
    </>
}