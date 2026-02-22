import {
  CalendarDaysIcon,
  CalendarRange,
  Clock,
  CreditCard,
  LucideProps,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import rara from "@/assest/user/navigation.png";
import EmptyTicketPage from "./EmptyTicketPage";
import { formatDateLong, formatTime } from "@/utils/formatDate";
import { FaMoneyBill, FaPaypal } from "react-icons/fa";

const ticketData = [
  {
    id: 1,
    ordernumber: "GT123456",
    createdAt: "2024-01-15T10:30:00Z",
    image: rara,
    name: "Rara Lake",
    paymentMethod: "CreditCard",
    price: 150,
    status: "Upcoming",
  },
  {
    id: 2,
    ordernumber: "GT123457",
    createdAt: "2024-01-16T10:30:00Z",
    image: rara,
    name: "Rara Lake",
    paymentMethod: "Paypal",
    price: 150,
    status: "Ended",
  },
];
const Page = () => {
  // const getColorByStatus = (status: string) => {
  //   switch (status) {
  //     case "Upcoming":
  //       return "text-orange-600";
  //     case "Ended":
  //       return "text-primary-600";
  //     case "Cancelled":
  //       return "text-red-600";
  //     default:
  //       return "text-grey-900";
  //   }
  // };

  return (
    <div className="padding-x my-12">
      <h2 className="typography-sub-h2-regular font-medium">My Tickets</h2>

      {!ticketData.length ? (
        <EmptyTicketPage />
      ) : (
        <div className="border-[0.4px] border-grey-50 mt-5 pb-4 rounded-3xl p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-grey-50">
              <thead>
                <tr>
                  <th className="px-4 py-3 typography-extra-large-body font-medium text-grey-400 text-left">
                    Tour
                  </th>
                  <th className="px-4 py-3 typography-extra-large-body font-medium text-grey-400 text-left">
                    Payment Method
                  </th>
                  <th className="px-4 py-3 typography-extra-large-body font-medium text-grey-400 text-left">
                    Price
                  </th>
                  <th className="px-4 py-3 typography-extra-large-body font-medium text-grey-400 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-grey-50">
                {ticketData.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td className="px-4 py-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                          <Image
                            src={order.image}
                            alt={order.name}
                            width={160}
                            height={110}
                            className="w-full max-w-[120px] sm:w-[160px] h-20 sm:h-28 object-cover rounded-xl flex-shrink-0"
                          />
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="typography-sub-h1-regular font-medium text-grey-700 truncate">
                              {order.name}
                            </span>

                            <p className="typography-large-body inline-flex items-center gap-2 text-grey-700 text-sm sm:text-base">
                              <CalendarDaysIcon className="text-[#FA8B02] w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="truncate sm:whitespace-normal">
                                {formatDateLong(order.createdAt)}
                              </span>
                            </p>

                            <p className="typography-large-body inline-flex items-center gap-2 text-grey-700 text-sm sm:text-base">
                              <Clock className="text-[#FA8B02] w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="truncate sm:whitespace-normal">
                                {formatTime(order.createdAt)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 typography-large-body text-grey-900">
                        {(() => {
                          const paymentMethodMap: Record<
                            string,
                            {
                              Icon: React.ComponentType<
                                React.SVGProps<SVGSVGElement>
                              >;
                            }
                          > = {
                            CreditCard: {
                              Icon: CreditCard,
                            },
                            Paypal: {
                              Icon: FaPaypal,
                            },
                            Cash: { Icon: Clock },
                          };

                          const { Icon } = paymentMethodMap[
                            order.paymentMethod
                          ] ?? {
                            Icon: FaMoneyBill,
                          };
                          return (
                            <div className="flex items-center gap-2">
                              <div className="border-[2px] border-[#B2BCCA] rounded-sm px-2 py-1">
                                <Icon />
                              </div>

                              <span>{order.paymentMethod}</span>
                            </div>
                          );
                        })()}
                        {/* {order.paymentMethod} */}
                      </td>

                      <td className="px-4 py-4 typography-large-body text-grey-900">
                        Rs. {order.price}
                      </td>

                      <td className="px-4 py-4 typography-large-body text-grey-900">
                        {(() => {
                          const statusMap: Record<
                            string,
                            {
                              Icon: React.ComponentType<LucideProps>;
                              color: string;
                            }
                          > = {
                            Upcoming: {
                              Icon: CalendarRange,
                              color: "text-orange-600",
                            },
                            Ended: {
                              Icon: CalendarDaysIcon,
                              color: "text-primary-600",
                            },
                            Cancelled: { Icon: Clock, color: "text-red-600" },
                          };

                          const { Icon, color } = statusMap[order.status] ?? {
                            Icon: CalendarRange,
                            color: "text-grey-900",
                          };

                          return (
                            <div className="flex items-center gap-2">
                              <Icon size={20} className={color} />
                              <span className="whitespace-nowrap">
                                {order.status}
                              </span>
                            </div>
                          );
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
