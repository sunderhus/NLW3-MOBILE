import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { BlankView, Container, Title } from "./styles";
interface IHeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<IHeaderProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();

  const handleGoBackToAppHomePage = useCallback(() => {
    navigation.navigate("OrphanageMap");
  }, []);

  return (
    <Container>
      <BorderlessButton onPress={navigation.goBack} rippleColor="#15b6db">
        <Feather name="arrow-left" size={24} color="#15b6db" />
      </BorderlessButton>
      <Title> {title}</Title>

      {showCancel ? (
        <BorderlessButton
          onPress={handleGoBackToAppHomePage}
          rippleColor="#ff669d"
        >
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <BlankView />
      )}
    </Container>
  );
};

export default Header;
