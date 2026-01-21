import {
  Image,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { imageData } from "../../../src/constants/home_NewsArticle";

export default function NewsArticle() {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <ScrollView>
      <View style={{ width: screenWidth }}>
        <Image
          source={imageData.testImage2}
          style={{ width: "100%", height: screenHeight * 0.25 }}
          resizeMode="cover" // covers the container without distortion
        />
        <ImageBackground
          source={require("../../../src/assets/banners/large.png")}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 30,
            aspectRatio: 2.5,
          }}
          resizeMode="cover"
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 25,
              fontWeight: 500,
            }}
            allowFontScaling={false}
          >
            {imageData.title}
          </Text>
        </ImageBackground>
        <View style={{ paddingHorizontal: 10, gap: 50 }}>
          <Text
            style={{ fontWeight: 600, fontSize: 20 }}
            allowFontScaling={false}
          >
            Previously on Our PCA Series
          </Text>
          <Text variant="titleSmall" allowFontScaling={false}>
            In our previous article, “How Does the Bureau of Customs Conduct a
            Post-Clearance Audit? Here’s What Importers Should Expect,” we
            explained how the Bureau of Customs (BOC) conducts a Post-Clearance
            Audit (PCA) from the issuance of an Audit Notification Letter (ANL)
            to the review of import records, findings, and possible demand
            letters for any discrepancies found. We also discussed the roles of
            importers, customs brokers, and the Post Clearance Audit Group
            (PCAG) in ensuring that every step of the process is transparent,
            fair, and compliant with CAO 01-2019. That article showed us that a
            Post-Clearance Audit is not meant to penalize, but to promote
            informed compliance and fair trade practices among importers.  But
            what if an importer discovers an error in their past declaration
            before or even during an audit? This is where the Prior Disclosure
            Program (PDP) becomes crucial. It offers importers an opportunity to
            voluntarily correct mistakes and avoid heavy penalties.
          </Text>
          <Text
            style={{ fontWeight: 600, fontSize: 20 }}
            allowFontScaling={false}
          >
            Previously on Our PCA Series
          </Text>
          <Text variant="titleSmall" allowFontScaling={false}>
            In our previous article, “How Does the Bureau of Customs Conduct a
            Post-Clearance Audit? Here’s What Importers Should Expect,” we
            explained how the Bureau of Customs (BOC) conducts a Post-Clearance
            Audit (PCA) from the issuance of an Audit Notification Letter (ANL)
            to the review of import records, findings, and possible demand
            letters for any discrepancies found. We also discussed the roles of
            importers, customs brokers, and the Post Clearance Audit Group
            (PCAG) in ensuring that every step of the process is transparent,
            fair, and compliant with CAO 01-2019. That article showed us that a
            Post-Clearance Audit is not meant to penalize, but to promote
            informed compliance and fair trade practices among importers.  But
            what if an importer discovers an error in their past declaration
            before or even during an audit? This is where the Prior Disclosure
            Program (PDP) becomes crucial. It offers importers an opportunity to
            voluntarily correct mistakes and avoid heavy penalties.
          </Text>
          <Text
            style={{ fontWeight: 600, fontSize: 20 }}
            allowFontScaling={false}
          >
            Previously on Our PCA Series
          </Text>
          <Text variant="titleSmall" allowFontScaling={false}>
            In our previous article, “How Does the Bureau of Customs Conduct a
            Post-Clearance Audit? Here’s What Importers Should Expect,” we
            explained how the Bureau of Customs (BOC) conducts a Post-Clearance
            Audit (PCA) from the issuance of an Audit Notification Letter (ANL)
            to the review of import records, findings, and possible demand
            letters for any discrepancies found. We also discussed the roles of
            importers, customs brokers, and the Post Clearance Audit Group
            (PCAG) in ensuring that every step of the process is transparent,
            fair, and compliant with CAO 01-2019. That article showed us that a
            Post-Clearance Audit is not meant to penalize, but to promote
            informed compliance and fair trade practices among importers.  But
            what if an importer discovers an error in their past declaration
            before or even during an audit? This is where the Prior Disclosure
            Program (PDP) becomes crucial. It offers importers an opportunity to
            voluntarily correct mistakes and avoid heavy penalties.
          </Text>
          <Text
            style={{ fontWeight: 600, fontSize: 20 }}
            allowFontScaling={false}
          >
            Previously on Our PCA Series
          </Text>
          <Text variant="titleSmall" allowFontScaling={false}>
            In our previous article, “How Does the Bureau of Customs Conduct a
            Post-Clearance Audit? Here’s What Importers Should Expect,” we
            explained how the Bureau of Customs (BOC) conducts a Post-Clearance
            Audit (PCA) from the issuance of an Audit Notification Letter (ANL)
            to the review of import records, findings, and possible demand
            letters for any discrepancies found. We also discussed the roles of
            importers, customs brokers, and the Post Clearance Audit Group
            (PCAG) in ensuring that every step of the process is transparent,
            fair, and compliant with CAO 01-2019. That article showed us that a
            Post-Clearance Audit is not meant to penalize, but to promote
            informed compliance and fair trade practices among importers.  But
            what if an importer discovers an error in their past declaration
            before or even during an audit? This is where the Prior Disclosure
            Program (PDP) becomes crucial. It offers importers an opportunity to
            voluntarily correct mistakes and avoid heavy penalties.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
