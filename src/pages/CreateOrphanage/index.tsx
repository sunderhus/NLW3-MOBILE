import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useState } from "react";
import { Alert, Keyboard, SafeAreaView, Switch } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { LatLng } from "react-native-maps";
import api from "../../services/api";
import {
  Comment,
  Container,
  ImagesInput,
  Input,
  Label,
  NextButton,
  NextButtonText,
  RemoveKeyboardContainer,
  SwitchContainer,
  Title,
  UploadedImage,
  ImagesList,
  UploadedWrapper,
} from "./styles";

interface ICreateOrphanageRouteParams {
  position: LatLng;
}

const CreateOrphanage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const params = route.params as ICreateOrphanageRouteParams;
  const position = params.position;

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const navigateToHome = useCallback(
    () => navigation.navigate("OrphanageMap"),
    [navigation]
  );

  async function handleCreateOrphanage() {
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("about", about);
      data.append("instructions", instructions);
      data.append("opening_hours", opening_hours);
      data.append("latitude", String(position.latitude));
      data.append("longitude", String(position.longitude));
      data.append("open_on_weekends", String(open_on_weekends));

      images.map((image, index) =>
        data.append("images", {
          name: `image_${index}.jpg`,
          type: `image/jpg`,
          uri: image,
        } as any)
      );

      await api.post("orphanages", data);

      Alert.alert(
        "Sucesso",
        `O orfanato ${name}, foi cadastrado com sucesso🎉`
      );

      navigateToHome();
    } catch (e) {
      Alert.alert("Ops!", "Revise os dados usados e tente novamente.");
    }
  }

  const handleSelectImages = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Para efetuar o cadastro de fotos, precisamos de acesso às suas fotos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: selectedImage } = result;

    setImages([...images, selectedImage]);
  }, [images, ImagePicker]);

  const handleRemoveImage = useCallback((imageUri: string) => {
    setImages((existentImages) => {
      return existentImages.filter(
        (existentImage) => existentImage !== imageUri
      );
    });
  }, []);

  const renderItem = useCallback(
    (imageUri: string) => {
      return (
        <UploadedWrapper onLongPress={() => handleRemoveImage(imageUri)}>
          <UploadedImage source={{ uri: imageUri }} />
        </UploadedWrapper>
      );
    },
    [handleRemoveImage]
  );

  const handleRemoveKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, [Keyboard]);

  return (
    <RemoveKeyboardContainer onPress={() => handleRemoveKeyboard}>
      <Container contentContainerStyle={{ padding: 24 }}>
        <Title>Dados</Title>

        <Label>Nome</Label>
        <Input onChangeText={setName} />

        <Label>Sobre</Label>
        <Input onChangeText={setAbout} style={[{ height: 110 }]} multiline />

        <Label>Fotos ( {images.length} )</Label>
        {!!images && images.length > 0 && (
          <Comment>(Segure para remover)</Comment>
        )}
        <SafeAreaView>
          <ImagesList
            data={images}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(`${item}-${index}`)}
            renderItem={({ item }) => renderItem(item)}
          />
          <ImagesInput onPress={handleSelectImages}>
            <Feather name="plus" size={24} color="#15B6D6" />
          </ImagesInput>
        </SafeAreaView>

        <Title>Visitação</Title>

        <Label>Instruções</Label>
        <Input
          onChangeText={setInstructions}
          style={[{ height: 110 }]}
          multiline
        />

        <Label>Horario de visitas</Label>
        <Input onChangeText={setOpeningHours} />

        <SwitchContainer>
          <Label>Atende final de semana?</Label>
          <Switch
            thumbColor="#fff"
            trackColor={{ false: "#ff669d", true: "#39CC83" }}
            value={open_on_weekends}
            onValueChange={setOpenOnWeekends}
          />
        </SwitchContainer>

        <NextButton onPress={handleCreateOrphanage}>
          <NextButtonText>Cadastrar</NextButtonText>
        </NextButton>
      </Container>
    </RemoveKeyboardContainer>
  );
};
export default CreateOrphanage;
