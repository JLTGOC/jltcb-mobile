import { DataTable, ActivityIndicator, MD2Colors } from "react-native-paper";

export default function Table() {
  const sampledata = ["commoodity", "date requested"];
  return (
    <>
      <DataTable>
        <DataTable.Header
          style={{
            backgroundColor: "#cecece",
            height: 25,
            paddingVertical: 0,
            marginVertical: 0,
            justifyContent: "center",
          }}
        >
          {sampledata.map((data) => (
            <DataTable.Title
              key={data}
              style={{
                height: 25,
                alignItems: "center",
                paddingVertical: 0,
                marginVertical: 0,
              }}
              textStyle={{
                fontSize: 12,
                lineHeight: 14,
                color: "white",
                includeFontPadding: false,
                textAlignVertical: "center",
              }}
            >
              {data.toUpperCase()}
            </DataTable.Title>
          ))}
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell numeric>1</DataTable.Cell>
          <DataTable.Cell numeric>2</DataTable.Cell>
          <DataTable.Cell numeric>3</DataTable.Cell>
          <DataTable.Cell numeric>4</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </>
  );
}
