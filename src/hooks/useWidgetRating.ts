import { useState, useCallback } from "react";
import { useNumberFormatter } from "@react-aria/i18n";

interface UseWidgetRatingProps {
  initialRating: number;
  ratingCount: number;
  onRatingChange?: (newRating: number) => void;
}

export function useWidgetRating({
  initialRating,
  ratingCount,
  onRatingChange,
}: UseWidgetRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [userRated, setUserRated] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Format numbers with proper separators based on locale
  const formatter = useNumberFormatter({
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedRatingCount = formatter.format(ratingCount);

  // Handle user rating a widget
  const handleRating = useCallback(
    (newRating: number) => {
      if (userRated || animating) return;

      setAnimating(true);

      // Simulate API call with a delay
      setTimeout(() => {
        setRating(newRating);
        setUserRated(true);
        setAnimating(false);

        if (onRatingChange) {
          onRatingChange(newRating);
        }
      }, 500);
    },
    [userRated, animating, onRatingChange]
  );

  // Generate ARIA props for accessibility
  const getRatingProps = (starValue: number) => {
    return {
      role: "button",
      "aria-label": `Rate ${starValue} out of 5 stars`,
      "aria-pressed": rating >= starValue,
      tabIndex: 0,
      onClick: () => handleRating(starValue),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleRating(starValue);
        }
      },
    };
  };

  return {
    rating,
    userRated,
    animating,
    formattedRatingCount,
    getRatingProps,
  };
}
