import { useEffect, useRef, useState } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";

export const useAudioPlayer = (uri?: string) => {
  const soundRef = useRef<Audio.Sound>(new Audio.Sound());
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    initPlayer();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, [uri]);

  const initPlayer = async () => {
    if (!uri) {
      return;
    }

    await soundRef.current.loadAsync({ uri: uri });

    soundRef.current.setOnPlaybackStatusUpdate(
      async (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
          if (status.didJustFinish) {
            await stopAsync();
          }
        }
      }
    );
  };

  const playAsync = async () => {
    await soundRef.current.playAsync();
    setPlaying(true);
  };

  const stopAsync = async () => {
    await soundRef.current.stopAsync();
    await soundRef.current.setPositionAsync(0);
    setPlaying(false);
  };

  return {
    playAsync,
    stopAsync,
    playing,
  };
};
