import React, { useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

import {
  Container,
  MapContainer,
  CalloutContainer,
  CalloutText,
  CreateOrphanageButton,
  Footer,
  FooterText,
} from "./styles";

import mapMarker from "../../images/mapMarker.png";
import { useNavigation } from "@react-navigation/native";

const OrphanageMap: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToOrphanageDetails = useCallback(() => {
    navigation.navigate("OrphanageDetails");
  }, []);

  return (
    <Container>
      <MapContainer
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -27.2092052,
            longitude: -49.6401092,
          }}
          calloutAnchor={{
            x: 2.7,
            y: 0.81,
          }}
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <CalloutContainer>
              <CalloutText>Lar boa esperança</CalloutText>
            </CalloutContainer>
          </Callout>
        </Marker>
      </MapContainer>

      <Footer>
        <FooterText> 2 orfanatos encontrados.</FooterText>
        <CreateOrphanageButton onPress={() => {}}>
          <Feather name="plus" size={20} color="#FFF" />
        </CreateOrphanageButton>
      </Footer>
    </Container>
  );
};

export default OrphanageMap;
