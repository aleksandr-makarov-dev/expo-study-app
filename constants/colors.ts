import { DefaultTheme } from "@react-navigation/native";
import colors from "tailwindcss/colors";

export default {
  light: {
    ...DefaultTheme,
    colors: {
      primary: colors.neutral[900],
      background: colors.white,
      card: colors.neutral[100],
      text: colors.neutral[800],
      border: colors.neutral[500],
      notification: colors.neutral[700],
    },
  },
  dark: {
    ...DefaultTheme,
    colors: {
      primary: colors.neutral[100],
      background: colors.zinc[900],
      card: colors.neutral[950],
      text: colors.neutral[300],
      border: colors.neutral[500],
      notification: colors.neutral[700],
    },
  },
};
