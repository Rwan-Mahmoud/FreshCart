import BrandProducts from "@/Features/Brands/Screens/BrandProducts";

export default async function BrandProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BrandProducts params={{ id }} />;
}