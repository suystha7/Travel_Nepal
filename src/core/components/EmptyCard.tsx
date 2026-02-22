import Link from "next/link";

const EmptyCard = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center h-[60vh] px-4 `}
      >
        <div
          className={` text-gray-800 rounded-lg px-6 py-4 text-center  max-w-md ${className}`}
        >
          <h2 className="text-xl font-semibold mb-4">{message}</h2>
          <div className="flex justify-center ">
            <Link
              href="/menu"
              className="bg-primary-500 px-6 py-2 rounded-lg w-fit text-white cursor-pointer"
            >
              Show Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyCard;
