// app/(Platform)/categories/[id]/subcategories/page.tsx

import SubCategories from '@/Features/Categories/Screens/SubCategories';

export default async function SubCategoriesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SubCategories params={{ id }} />;
}