import { RectButton } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import styled from "styled-components/native";

export const Container = styled.View`
  background: #000333;
  justify-content: center;
  flex: 1;
  align-items: center;
`;

export const MapContainer = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const CalloutContainer = styled.View`
  width: 160px;
  height: 46px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  justify-content: center;
`;

export const CalloutText = styled.Text`
  color: #0089a5;
  font-size: 14px;
  font-family: Nunito_700Bold;
`;

export const Footer = styled.View`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 32px;

  background-color: #fff;
  border-radius: 20px;
  height: 56px;
  padding-left: 24px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  elevation: 4;
`;

export const FooterText = styled.Text`
  color: #8fa7b3;
  font-size: 15px;
  line-height: 25px;
  font-family: Nunito_700Bold;
`;
export const CreateOrphanageButton = styled(RectButton)`
  width: 54px;
  height: 56px;
  background-color: #15c3d6;
  border-radius: 20px;

  justify-content: center;
  align-items: center;
`;
