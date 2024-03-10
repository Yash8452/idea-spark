import Link from "next/link";
import { CardData } from "./CardContainer";
import Image from "next/image";

function Card({ title, description, imageUrl }: CardData) {
  return (
    <>
      <div className="max-w-sm p-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col space-x-2">
          <Image src={imageUrl} alt="new" width={300} height={200} />

          <div className="p-4 flex space-x-2">
            <Image
              className="w-10  h-10 rounded-full"
              src={imageUrl}
              alt={title}
            />

            <div className="ml-2">
              <Link href={`/profile`}>
                <h5>Username</h5>
              </Link>

              <p className="text-xs font-thin  text-gray-500 mt-1">
                <span>{/* {formatDuration(post.createdAt)} */}12/03/2024</span>
              </p>
            </div>
          </div>
        </div>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {title}
          {description}
        </p>
      </div>
    </>
  );
}

export default Card;
