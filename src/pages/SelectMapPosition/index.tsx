import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { MapEvent, Marker } from "react-native-maps";
import mapMarkerImg from "../../images/mapMarker.png";
import { Container, Map, NextButton, NextButtonText } from "./styles";

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate("CreateOrphanage", { position });
  }

  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -30.0091973,
          longitude: -51.1511223,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
      >
        {!!position.latitude && (
          <Marker icon={mapMarkerImg} coordinate={position} />
        )}
      </Map>

      {!!position.latitude && (
        <NextButton onPress={handleNextStep}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      )}
    </Container>
  );
};
export default SelectMapPosition;
