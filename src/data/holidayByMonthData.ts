import jan from "@/assest/january.jpg";
import feb from "@/assest/february.png";
import mar from "@/assest/march.png";
import apr from "@/assest/april.png";
import may from "@/assest/may.png";
import june from "@/assest/june.png";
import { StaticImageData } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface IHolidayData {
  id: string;
  image: string | StaticImageData | StaticImport;
  title: string;
  description?: string;
}
export const holidayByMonth: IHolidayData[] = [
  {
    id: "1",
    image: jan,
    title: "January",
    description:
      "Start the year with a refreshing getaway to kickstart your adventures.",
  },
  {
    id: "2",
    image: feb,
    title: "February",
    description:
      "Celebrate love and adventure with a romantic or thrilling February escape.",
  },
  {
    id: "3",
    image: mar,
    title: "March",
    description:
      "Embrace the arrival of spring with vibrant destinations and blossoming experiences.",
  },
  {
    id: "4",
    image: apr,
    title: "April",
    description:
      "April showers bring May flowers – perfect for a rejuvenating retreat.",
  },
  {
    id: "5",
    image: may,
    title: "May",
    description:
      "Experience the beauty of late spring with scenic landscapes and outdoor fun.",
  },
  {
    id: "6",
    image: june,
    title: "June",
    description:
      "Kick off the summer season with sunny adventures and beach escapes.",
  },
  {
    id: "7",
    image: jan,
    title: "July",
    description:
      "Celebrate mid-year with vibrant festivals and unforgettable summer trips.",
  },
  {
    id: "8",
    image: feb,
    title: "August",
    description:
      "Make the most of the summer heat with exciting outdoor activities and travels.",
  },
  {
    id: "9",
    image: mar,
    title: "September",
    description:
      "Welcome the fall season with scenic journeys and cultural explorations.",
  },
  {
    id: "10",
    image: apr,
    title: "October",
    description:
      "Experience the magic of autumn with colorful foliage and cozy getaways.",
  },
  {
    id: "11",
    image: may,
    title: "November",
    description:
      "Embrace the spirit of gratitude with memorable trips and festive celebrations.",
  },
  {
    id: "12",
    image: june,
    title: "December",
    description:
      "End the year with joyful holidays and winter wonderland adventures.",
  },
];
