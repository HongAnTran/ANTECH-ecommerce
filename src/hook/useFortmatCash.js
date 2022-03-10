const formatCash = function (param) {
  const str = param.toString();

  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
};

export const convertPrice = function (priceStr) {
  const price = priceStr.replaceAll(".", "");

  return Number(price);
};

export default formatCash;
