/**
 * Return Precise round upto the number specified.
 * @param num Number
 * @param pre Precision Required
 */
export const preciseRound = (num: number | string, pre: number) => {
  if (typeof num === typeof "") num = parseFloat(num);
  var factor = Math.pow(10, pre);
  return Math.round(num * factor) / factor;
};
