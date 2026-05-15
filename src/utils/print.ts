import { type PrintOptions, printAsync } from "expo-print";

export const print = (options: PrintOptions) => printAsync(options);
