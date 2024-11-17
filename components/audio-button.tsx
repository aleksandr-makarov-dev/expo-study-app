import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { View } from "react-native";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface AudioButtonProps extends ButtonProps {
  uri: string;
}

export const AudioButton = React.forwardRef<View, AudioButtonProps>(
  ({ uri, ...props }, ref) => {
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
        {...props}
      />
    );
  }
);
