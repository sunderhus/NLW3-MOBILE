import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import styled from "styled-components/native";

export const Container = styled(ScrollView)`
  flex: 1;
`;
export const ImagesContainer = styled.View`
  height: 240px;
`;

export const Image = styled.Image`
  width: ${`${Dimensions.get("window").width}px`};
  height: 240px;
`;
export const DetailsContainer = styled.View`
  padding: 24px;
`;
export const Title = styled.Text`
  color: #4d6f80;
  font-size: 30px;
  font-family: Nunito_700Bold;
`;
export const Description = styled.Text`
  font-family: Nunito_600SemiBold;
  color: #5c8599;
  line-height: 24px;
  margin-top: 16px;
`;
export const MapContainer = styled.View`
  border-radius: 20px;
  overflow: hidden;
  border-width: 1.2px;
  border-color: #b3dae2;
  margin-top: 40px;
  background-color: #e6f7fb;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 150px;
`;
export const RoutesContainer = styled(TouchableOpacity)`
  padding: 16px;
  align-items: center;
  justify-content: center;
`;
export const RoutesText = styled.Text`
  font-family: Nunito_700Bold;
  color: #0089a5;
`;

export const Separator = styled.View`
  height: 0.8px;
  width: 100%;
  background-color: #d3e2e6;
  margin: 40px 0px;
`;
export const ScheduleContainer = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
`;

const ScheduleItem = styled.View`
  width: 48%;
  padding: 20px;
`;

export const ScheduleItemBlue = styled(ScheduleItem)`
  background-color: #e6f7fb;
  border-color: #b3dae2;
  border-width: 1px;
  border-radius: 20px;
`;
export const ScheduleItemGreen = styled(ScheduleItem)`
  background-color: #edfff6;
  border-color: #a1e9c5;
  border-width: 1px;
  border-radius: 20px;
`;
export const ScheduleItemRed = styled(ScheduleItem)`
  background-color: #ffeded;
  border-color: #ffbcd4;
  border-width: 1px;
  border-radius: 20px;
`;

const ScheduleText = styled.Text`
  font-family: Nunito_600SemiBold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
`;

export const ScheduleTextBlue = styled(ScheduleText)`
  color: #5c8599;
`;
export const ScheduleTextGreen = styled(ScheduleText)`
  color: #37c77f;
`;
export const ScheduleTextRed = styled(ScheduleText)`
  color: #ff669d;
`;

export const ContactButton = styled(RectButton)`
  background-color: #3cdc8c;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 56px;
  margin-top: 40px;
`;

export const ContactButtonText = styled.Text`
  font-family: Nunito_800ExtraBold;
  color: #fff;
  font-size: 16px;
  margin-left: 16px;
`;
