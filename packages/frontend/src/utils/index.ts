export const generateColors = (length: number) => {
  const colors = [];
  for (let i = 0; i < length; i++) {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    colors.push(`rgba(${red}, ${green}, ${blue}, 0.7)`);
  }
  return colors;
};
