// "use client";

// import React, { useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
// } from "@/components/ui/dropdown-menu";

// import { ChevronDown } from "lucide-react";
// import IncreaseDecreaseButton from "@/app/user/book/[id]/partials/MemberIncreaseButton";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// interface GuestDropDownProps {
//   guests: number;
//   setGuests: React.Dispatch<React.SetStateAction<number>>;
// }

// const GuestDropDown = ({ guests, setGuests }: GuestDropDownProps) => {
//   const [children, setChildren] = useState(2);
//   const [rooms, setRooms] = useState(1);

//   const [childAges, setChildAges] = useState<number[]>([]);

//   const handleAgeSelect = (index: number, age: number) => {
//     const updatedAges = [...childAges];
//     updatedAges[index] = age;
//     setChildAges(updatedAges);
//   };
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className="flex flex-row gap-2">
//         <div>
//           <p className="typography-sub-h2-medium text-grey-900">Guest</p>
//           <p className="typography-mid-body-light text-grey-400">-Add+</p>
//         </div>
//         <ChevronDown className="inline ml-1 w-4 h-4 text-grey-900" />
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         side="bottom"
//         align="start"
//         className="w-52 p-4 bg-white shadow-xl border rounded-xl space-y-4"
//       >
//         {/* Adults */}
//         <div className="flex items-center justify-between">
//           <span className="text-gray-700">Adults</span>
//           <IncreaseDecreaseButton quantity={guests} />
//         </div>

//         {/* Children */}
//         <div className="flex items-center justify-between">
//           <span className="text-gray-700">Children</span>
//           <IncreaseDecreaseButton quantity={3} />
//         </div>

//         {/* Child age dropdowns */}
//         {children > 0 && (
//           <div className="space-y-2">
//             {Array.from({ length: children }).map((_, i) => (
//               <div key={i} className="flex justify-between items-center">
//                 <Select
//                   value={childAges[i]?.toString() || ""}
//                   onValueChange={(value) => handleAgeSelect(i, Number(value))}
//                 >
//                   <SelectTrigger className="w-full border border-grey-100 rounded-lg p-2 typography-large-body font-light text-grey-500 lg:mr-8">
//                     <SelectValue placeholder="Age Required" />
//                   </SelectTrigger>
//                   <SelectContent className="max-h-48 overflow-auto">
//                     {Array.from({ length: 16 }).map((_, idx) => (
//                       <SelectItem
//                         key={idx + 1}
//                         value={(idx + 1).toString()}
//                         className={
//                           "w-full border border-grey-100 rounded-lg p-2 typography-large-body font-light text-grey-800 my-1 " +
//                           "hover:bg-primary-50 " +
//                           "data-[highlighted]:bg-primary-50 data-[highlighted]:text-grey-900 " +
//                           "data-[state=checked]:bg-primary-100"
//                         }
//                       >
//                         {idx + 1} years old
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Rooms */}
//         <div className="flex items-center justify-between pt-2 border-t">
//           <span className="text-gray-700">Rooms</span>
//           <IncreaseDecreaseButton quantity={rooms} />
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default GuestDropDown;
