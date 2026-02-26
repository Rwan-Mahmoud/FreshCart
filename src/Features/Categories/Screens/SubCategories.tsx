// src/Features/Categories/Screens/SubCategories.tsx



import SubCategoryCard from '../Components/SubCategoryCard';
import { getSubCategories } from '../Server/categories.action';
import { SubCategory } from '../Types/categories.types';

interface SubCategoriesProps {
  params: { id: string };
}

export default async function SubCategories({ params }: SubCategoriesProps) {
  const categoryId = params.id;

const response  =await  getSubCategories(categoryId)

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Subcategories</h1>

         <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
                 {response.data.map((sub:SubCategory)=>(
                  <SubCategoryCard key={sub._id} info={sub}/>
                 ))}
              </div>
            </div>
    </div>
  );
}