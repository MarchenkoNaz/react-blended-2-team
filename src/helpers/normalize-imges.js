export const getNormalizedImages = array => {
  return array.map(({ alt, src: { medium, large }, avg_color, id }) => ({
    alt,
    medium,
    large,
    avg_color,
    id,
  }));
};
