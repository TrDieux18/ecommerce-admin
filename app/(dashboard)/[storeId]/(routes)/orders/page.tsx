import prismadb from "@/lib/prismadb";

import { OrderColumn } from "./components/columns";
import { formatDate, formatPrice } from "@/lib/utils";
import { OrderClient } from "./components/client";


const OrdersPage = async ({
   params,
}: {
   params: Promise<{ storeId: string }>;
}) => {
   const { storeId } = await params;

   const orders = await prismadb.order.findMany({
      where: {
         storeId,
      },
      include: {
         orderItems: {
            include: {
               product: true
            }
         }
      }
      ,
      orderBy: {
         createdAt: 'desc'

      }
   });

   const formattedOrders: OrderColumn[] = orders.map((order) => ({
      id: order.id,
      phone: order.phone,
      address: order.address,
      isPaid: order.isPaid,
      products: order.orderItems.map((item) => item.product.name).join(", "),
      totalPrice: formatPrice.format(order.orderItems.reduce((total, item) => {
         return total + Number(item.product.price);
      }, 0)),
      createdAt: formatDate(order.createdAt),
   }))
   return <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
         <OrderClient data={formattedOrders} />
      </div>
   </div>;
}
export default OrdersPage;