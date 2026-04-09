const renderRating = (rating?: number | null) => {
  if (rating == null || rating <= 0) return null;

  const safeRating = Math.max(1, Math.min(10, rating));
  const normalizedRating = safeRating / 2;

  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-500 text-sm">
        {"★".repeat(fullStars)}
        {hasHalfStar ? "⯨" : ""}
        {"☆".repeat(emptyStars)}
      </div>
      <span className="text-xs text-gray-500">{safeRating}/10</span>
    </div>
  );
};

export default renderRating;