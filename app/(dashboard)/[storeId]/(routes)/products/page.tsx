import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatDate, formatPrice } from "@/lib/utils";


const ProductsPage = async ({
   params,
}: {
   params: Promise<{ storeId: string }>;
}) => {
   const { storeId } = await params;

   const products = await prismadb.product.findMany({
      where: {
         storeId,
      },
      include: {
         category: true,
         size: true,
         color: true,
      },
      orderBy: {
         createdAt: 'desc'

      }
   });

   const formattedProducts: ProductColumn[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      isArchived: product.isArchived,
      isFeatured: product.isFeatured,
      price: formatPrice.format(product.price.toNumber()),
      category: product.category.name,
      size: product.size.name,
      color: product.color.value,
      createdAt: formatDate(product.createdAt),
   }))
   return <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
         <ProductClient data={formattedProducts} />
      </div>
   </div>;
}
export default ProductsPage;