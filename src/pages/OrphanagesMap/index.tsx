import React, { useCallback, useEffect, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import api from "../../services/api";

interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanageMap: React.FC = () => {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useFocusEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  });

  const handleNavigateToOrphanageDetails = useCallback((id: number) => {
    navigation.navigate("OrphanageDetails", { id });
  }, []);

  const handleNavigateToOrphanage = useCallback(() => {
    navigation.navigate("SelectMapPosition");
  }, []);

  return (
    <Container>
      <MapContainer
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -30.0091973,
          longitude: -51.1511223,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(({ id, name, latitude, longitude }) => {
          return (
            <Marker
              key={id}
              icon={mapMarker}
              coordinate={{
                latitude,
                longitude,
              }}
              calloutAnchor={{
                x: 2.7,
                y: 0.81,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToOrphanageDetails(id)}
              >
                <CalloutContainer>
                  <CalloutText>{name}</CalloutText>
                </CalloutContainer>
              </Callout>
            </Marker>
          );
        })}
      </MapContainer>

      <Footer>
        <FooterText> {orphanages.length} orfanatos encontrados.</FooterText>
        <CreateOrphanageButton
          rippleColor="#15b6db"
          onPress={handleNavigateToOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </CreateOrphanageButton>
      </Footer>
    </Container>
  );
};

export default OrphanageMap;
