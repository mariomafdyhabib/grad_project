const StarRating = ({ rating }: { rating: number }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5 ? 1 : 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<StarFilled key={i} />);
    }
    if (halfStar) {
      stars.push(<StarHalf key={filledStars} />);
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

const StarFilled = () => (
  <span className="text-3xl text-yellow-500">&#9733;</span>
);
const StarHalf = () => <span>&#9734;&#xFE0E;</span>; // Half star character

export default StarRating;
