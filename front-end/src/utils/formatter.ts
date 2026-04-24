export const formatterPrice = (value: number) => {
  return `Kz ${value.toFixed(2).replace(".", ",")}`;
};
