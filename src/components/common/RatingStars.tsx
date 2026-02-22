import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export const RatingStars: React.FC<{
  rating: number;
  totalComments?: number;
}> = ({ rating, totalComments }) => {
  const maxRating = 5;
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;
  const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <ul className="flex gap-2 items-center text-center justify-center">
      {Array.from({ length: fullStars }, (_, i) => (
        <IoStar key={`full-${i}`} className="text-star" size={15} />
      ))}
      {hasHalfStar && <IoStarHalf key="half" className="text-star" size={15} />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <IoStarOutline
          key={`empty-${i}`}
          className="text-[#D4D4D4]"
          size={15}
        />
      ))}
      {totalComments && (
        <span className="pl-1 text-white">({Number(totalComments)})</span>
      )}
    </ul>
  );
};
