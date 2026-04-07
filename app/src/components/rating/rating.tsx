const renderRating = (rating?: number | null) => {
        if (!rating || rating === 0) return null;
        const normalizeRating = rating / 2;
        const fullStars = Math.floor(normalizeRating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        return (
            <div className="flex items-center gap-1">
                <div className="flex text-yellow-500">
                    {'★'.repeat(fullStars)}
                    {hasHalfStar && '½'}
                    {'☆'.repeat(5 - Math.ceil(rating))}
                </div>
                <span className="text-xs text-gray-500">({rating})</span>
            </div>
        );
    };

    export default renderRating;