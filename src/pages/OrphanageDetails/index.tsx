import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Linking, ScrollView } from "react-native";
import { Marker } from "react-native-maps";
import mapMarkerImg from "../../images/mapMarker.png";
import api from "../../services/api";
import {
  ContactButton,
  ContactButtonText,
  Container,
  Description,
  DetailsContainer,
  Image,
  ImagesContainer,
  Map,
  MapContainer,
  RoutesContainer,
  RoutesText,
  ScheduleContainer,
  ScheduleItemBlue,
  ScheduleItemGreen,
  ScheduleItemRed,
  ScheduleTextBlue,
  ScheduleTextGreen,
  ScheduleTextRed,
  Separator,
  Title,
} from "./styles";

interface IOrphanageRouteParams {
  id: number;
}
interface IImage {
  id: number;
  imagePath: string;
}
interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: IImage[];
}

const OrphanageDetails: React.FC = () => {
  const [orphanage, setOrphanage] = useState<IOrphanage>();
  const route = useRoute();
  const params = route.params as IOrphanageRouteParams;

  const handleOpenGoogleMapsRoutes = useCallback((latitude, longitude) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude}${longitude}`
    );
  }, []);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(({ data }) => {
      setOrphanage(data);
    });
  }, [params.id]);

  if (!orphanage) {
    return (
      <Container>
        <Description>Carregando...</Description>
      </Container>
    );
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(({ imagePath, id }) => {
            return (
              <Image
                key={id}
                source={{
                  uri: `${imagePath}`,
                }}
              />
            );
          })}
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>{orphanage.name}</Title>
        <Description>{orphanage.about}</Description>

        <MapContainer>
          <Map
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </Map>

          <RoutesContainer
            onPress={() =>
              handleOpenGoogleMapsRoutes(
                orphanage.latitude,
                orphanage.longitude
              )
            }
          >
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <ScheduleItemBlue>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <ScheduleTextBlue>{orphanage.opening_hours}</ScheduleTextBlue>
          </ScheduleItemBlue>

          {orphanage.open_on_weekends ? (
            <ScheduleItemGreen>
              <Feather name="info" size={40} color="#39CC83" />
              <ScheduleTextGreen>Atendemos fim de semana</ScheduleTextGreen>
            </ScheduleItemGreen>
          ) : (
            <ScheduleItemRed>
              <Feather name="info" size={40} color="#ff669d" />
              <ScheduleTextRed>Não Atendemos fim de semana</ScheduleTextRed>
            </ScheduleItemRed>
          )}
        </ScheduleContainer>

        <ContactButton onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
      </DetailsContainer>
    </Container>
  );
};

export default OrphanageDetails;
