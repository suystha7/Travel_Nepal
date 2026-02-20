"use client";

import useGetCategoryFilter from "../hooks/useGetCategoryFilter";

interface FooterMenuProps {
  categoryList: any;
}

const FooterMenu: React.FC<FooterMenuProps> = ({ categoryList }) => {
  const { handleCategoryClick, isActive } = useGetCategoryFilter("type");

  const visibleCategories = categoryList?.slice(0, 10);
  return (
    <div>
      <div className="typography-sub-h3-light font-medium text-grey-400 pb-4">
        Package Categories
      </div>

      <ul className="text-grey-900 typography-mid-body-light space-y-4">
        {visibleCategories?.map((item: any) => (
          <li
            key={item?.id}
            className={`transition-all duration-600 hover:translate-x-1 cursor-pointer hover:underline
              ${isActive(item.type) ? "text-white" : "hover:text-gray-900"}`}
            onClick={() => handleCategoryClick(item?.type)}
          >
            {item?.name}
          </li>
        ))}
      </ul>

      {/* <div>
        <div className="typography-sub-h3-light font-medium text-grey-400 pb-4">
          Package Type
        </div>

        <ul className="text-grey-900 typography-mid-body-light space-y-4">
          {visibleCategories?.map((item: any) => (
            <li
              key={item?.id}
              className={`transition-all duration-600 hover:translate-x-1 cursor-pointer hover:underline
              ${isActive(item.type) ? "text-white" : "hover:text-gray-900"}`}
              onClick={() => handleCategoryClick(item?.type)}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default FooterMenu;
// "use client";

// interface ListMenuProps<T> {
//   title?: string;
//   items: T[];
//   labelKey: keyof T;
//   valueKey: keyof T;
//   max?: number;
//   isActive?: (value: any) => boolean;
//   onItemClick?: (value: any, item: T) => void;
// }

// export function ListMenu<T>({
//   title = "Menu",
//   items,
//   labelKey,
//   valueKey,
//   max = 10,
//   isActive,
//   onItemClick,
// }: ListMenuProps<T>) {
//   const visibleItems = items?.slice(0, max) || [];

//   return (
//     <div>
//       <div className="typography-sub-h3-light text-grey-900 pb-4">{title}</div>

//       <ul className="text-grey-900 typography-mid-body-light space-y-4">
//         {visibleItems.map((item, i) => {
//           const label = item[labelKey];
//           const value = item[valueKey];
//           const active = isActive ? isActive(value) : false;

//           return (
//             <li
//               key={i}
//               className={`transition-all duration-300 hover:translate-x-1 cursor-pointer hover:underline
//                 ${active ? "text-white" : "hover:text-gray-900"}`}
//               onClick={() => onItemClick?.(value, item)}
//             >
//               {String(label)}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
