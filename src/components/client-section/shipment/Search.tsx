import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  DataTable,
  Icon,
  IconButton,
  Menu,
  TextInput,
} from "react-native-paper";

type Props = {
  search: string;
  setSearch: (value: string) => void;
}

export default function Search({ search, setSearch }: Props) {
    return (
        <View style={styles.inputContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          mode="flat"
          placeholder="ENTER REFERENCE NUMBER"
          placeholderTextColor="#666"
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor="#f2994a"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Submit")}
        >
          <Icon source="magnify" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
    height: 50,
  },
  header: {
    backgroundColor: "#cecece",
    height: 25,
    paddingVertical: 0,
    marginVertical: 0,
    justifyContent: "center",
  },
  headerTitle: {
    flex: 2,
    height: 25,
    alignItems: "center",
    paddingVertical: 0,
    marginVertical: 0,
  },
  headerText: {
    fontSize: 12,
    lineHeight: 14,
    color: "white",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  cellText: {
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  menuItem: {
    height: 35,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 50,
    height: 45,
    margin: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    height: 50,
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#f2994a",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderEndEndRadius: 25,
    borderTopEndRadius: 25,
  },
});
