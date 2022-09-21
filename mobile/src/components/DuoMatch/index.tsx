import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  ModalProps,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import CheckCircle from "../../assets/CheckCircle.png";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";
import { Activity } from "phosphor-react-native";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setISCopping] = useState(false);

  const handleCopyDiscordToClipboard = async () => {
    setISCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert("Discord Copiado com sucesso!");
    setISCopping(false);
  };

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <Image source={CheckCircle} />
          <Heading
            title="Let’s play!"
            subTitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />
          <Text style={styles.label}>Adicone no Discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
