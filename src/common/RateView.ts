import { colors } from '../styles'

export const rateViewStyle = (profit: number | string, type: string): any => {
  if (profit > 0 && type == "text") {
    return { color: colors.green, fontWeight: "bold" };
  }

  if (profit < 0 && type == "text") {
    return { color: colors.red, fontWeight: "bold" };
  }

  if (profit > 0 && type == "bg") {
    return { backgroundColor: colors.green };
  }

  if (profit < 0 && type == "bg") {
    return { backgroundColor: colors.red };
  }

  return type === 'text' ? { color: colors.fontColor } : { backgroundColor: colors.lightBackgroundColor };
};
