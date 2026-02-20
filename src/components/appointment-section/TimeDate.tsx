import { Text, Chip } from "react-native-paper";
import { Dimensions, View, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
export default function TImeDate() {
  const screenWidth = Dimensions.get("window").width;

  const [date, setDate] = useState<string>("");

  const [selectedTime, setSelectedTime] = useState<string>("");

  const availableTimes = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  return (
    <View
      style={{
        padding: 10,
        marginTop: -25,
        flexDirection: "row",
        width: screenWidth,
        gap: 5,
      }}
    >
      <Calendar
        style={{
          width: screenWidth * 0.55,
        }}
        markedDates={{
          [date]: {
            selected: true,
            selectedColor: "#6200ee",
            disableTouchEvent: false,
            selectedTextColor: "#fff",
          },
        }}
        theme={{
          textDayFontSize: 12,
          textMonthFontSize: 14,
          textDayHeaderFontSize: 10,
          todayTextColor: "#6200ee",
        }}
        onDayPress={(day) => setDate(day.dateString)}
      />

      <FlatList
        data={availableTimes}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Chip
            key={item}
            compact
            onPress={() => setSelectedTime(item)}
            style={{
              margin: 4,
              backgroundColor:
                selectedTime === item ? "#6200ee" : "transparent",
              borderWidth: 1,
              borderColor: selectedTime === item ? "" : "#808080ff",
              width: "30%",
            }}
            textStyle={{
              fontSize: 11,
              color: selectedTime === item ? "#fff" : "#808080ff",
            }}
          >
            <Text allowFontScaling={false}>{item}</Text>
          </Chip>
        )}
      />
    </View>
  );
}
