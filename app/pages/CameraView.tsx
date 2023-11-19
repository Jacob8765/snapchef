import {useIsFocused} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View, Text, Button} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export const CameraView = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const isFocused = useIsFocused();
  //   const appState = useAppState()
  const isActive = isFocused;

  const camera = useRef<Camera>(null);

  const device = useCameraDevice('back');
  if (device == null) return null;

  if (!hasPermission) {
    return (
      <View>
        <Text>No permission</Text>
        <Button title="Request permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <>
      <Camera
        ref={camera}
        photo={true}
        style={{flex: 1}}
        device={device}
        isActive={true}
      />
      <Button
        title="Take photo"
        onPress={async () => {
          const photo = await camera.current?.takePhoto({
            qualityPrioritization: 'quality',
          });
          console.log(photo);
        }}
      />
    </>
  );
};
