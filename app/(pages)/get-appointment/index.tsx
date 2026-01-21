import { Text, ImageBackground, View, FlatList } from "react-native";
import TimeDate from "./TimeDate";
import Form from "./Form";

export default function GetAppointment() {
  return (
    <FlatList
      data={[1]} // dummy item
      keyExtractor={(item) => item.toString()}
      renderItem={() => null}
      ListHeaderComponent={() => (
        <View>
          <ImageBackground
            source={require("../../../src/assets/banners/large.png")}
            style={{
              padding: 20,
              aspectRatio: 2,
            }}
            resizeMode="cover"
          >
            <Text
              style={{
                color: "#EE9034",
                fontSize: 20,
                fontWeight: "500",
                marginBottom: 5,
              }}
              allowFontScaling={false}
            >
              BOOK YOUR APPOINTMENT NOW
            </Text>

            <View
              style={{
                borderLeftWidth: 4,
                borderLeftColor: "#EE9034",
                margin: 5,
                paddingHorizontal: 5,
                height: 55,
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 12, color: "white" }}
                allowFontScaling={false}
              >
                At Jill L. Tolentino Customs Brokerage, we simplify imports and
                exports for businesses nationwide...
              </Text>
            </View>
          </ImageBackground>
          <TimeDate />
          <Form />
        </View>
      )}
    />
  );
}
