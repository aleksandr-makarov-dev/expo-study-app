import React from "react";
import { Button } from "./ui/button";
import { View } from "react-native";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

interface AudioButtonProps {
  uri: string;
}

export const AudioButton = React.forwardRef<View, AudioButtonProps>(
  ({ uri }, ref) => {
    const { playAsync, playing, stopAsync } = useAudioPlayer(uri);

    const handlePressed = async () => {
      if (playing) {
        await stopAsync();
      } else {
        await playAsync();
      }
    };

    return (
      <Button
        icon={playing ? "volume-high" : "volume-medium"}
        title="Play"
        ref={ref}
        onPress={handlePressed}
      />
    );
  }
);
