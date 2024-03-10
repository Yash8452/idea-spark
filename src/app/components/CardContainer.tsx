import Card from "./Card";
import { StaticImageData } from "next/image";
import Snap from "@/app/Snap.png";

export interface CardData {
  title: string;
  description: string;
  imageUrl: StaticImageData;
}

const cardData: CardData[] = [
  {
    title: "Title 1",
    description: "Description 1",
    imageUrl: Snap,
  },
  {
    title: "Title 2",
    description: "Description 2",
    imageUrl: Snap,
  },
  // Add more card data
  {
    title: "Title 3",
    description: "Description 3",
    imageUrl: Snap,
  },
  {
    title: "Title 4",
    description: "Description 4",
    imageUrl: Snap,
  },
  {
    title: "Title 4",
    description: "Description 4",
    imageUrl: Snap,
  },
  {
    title: "Title 4",
    description: "Description 4",
    imageUrl: Snap,
  },
  {
    title: "Title 4",
    description: "Description 4",
    imageUrl: Snap,
  },
  {
    title: "Title 4",
    description: "Description 4",
    imageUrl: Snap,
  },
  // Add more card data as needed
];

export function CardContainer() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {cardData.map((data, index) => (
          <Card key={index} {...data} />
        ))}
      </div>
    </>
  );
}
