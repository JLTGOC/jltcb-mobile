import { printAsync, type PrintOptions } from "expo-print";

export const print = (options: PrintOptions) => printAsync(options);
