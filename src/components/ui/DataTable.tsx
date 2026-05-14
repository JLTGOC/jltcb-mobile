import type { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { DataTable as BaseDataTable } from "react-native-paper";

import type { TableHeader } from "@/src/types";

interface Props<T> {
  headers: TableHeader[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  extractCells: (item: T) => (string | number | ReactNode)[];
  onRowPress?: (item: T) => void;
}

export default function DataTable<T>({
  headers,
  data,
  keyExtractor,
  extractCells,
  onRowPress,
}: Props<T>) {
  return (
    <BaseDataTable style={{ marginBottom: 16 }}>
      <BaseDataTable.Header style={styles.tableHeader}>
        {headers.map((header, index) => (
          <BaseDataTable.Title
            style={[styles.headerTitle, styles.gap, header.style]}
            textStyle={styles.uppercase}
            key={header.title || index}
          >
            {header.title}
          </BaseDataTable.Title>
        ))}
      </BaseDataTable.Header>
      {data.map((item, index) => {
        const cells = extractCells(item);

        return (
          <BaseDataTable.Row
            key={keyExtractor(item, index)}
            onPress={onRowPress ? () => onRowPress(item) : undefined}
          >
            {cells.map((cell, i) => {
              const tableHeader = headers[i];
              return (
                <BaseDataTable.Cell
                  key={`${keyExtractor(item, index)}-${tableHeader.title || i}`}
                  style={[
                    styles.cell,
                    styles.gap,
                    tableHeader.style,
                    tableHeader.cellStyle,
                  ]}
                  numeric={tableHeader?.numeric}
                >
                  {typeof cell === "string" || typeof cell === "number" ? (
                    <Text style={[styles.cellText, tableHeader.cellTextStyle]}>
                      {cell}
                    </Text>
                  ) : (
                    cell
                  )}
                </BaseDataTable.Cell>
              );
            })}
          </BaseDataTable.Row>
        );
      })}
    </BaseDataTable>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    backgroundColor: "#E5E5E5",
  },
  headerTitle: {
    paddingVertical: 4,
  },
  uppercase: {
    textTransform: "uppercase",
  },
  cell: {},
  cellText: {},
  gap: {
    paddingHorizontal: 4,
  },
});
