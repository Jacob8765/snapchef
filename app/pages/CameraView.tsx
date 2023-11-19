import {useIsFocused} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View, Text, Button} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

/*
 * 1. Take the picture
 * 2. Show a little animation
 * 3. Update the ingredients
 * 4. Navigate back to the ingredients page
 */

export const CameraView = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const isFocused = useIsFocused();
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
        isActive={isActive}
      />
      <Button
        title="Take photo"
        onPress={async () => {
          if (!camera.current) return;
          const file = await camera.current.takePhoto();
          const result = await fetch(`file://${file.path}`);
          const data = await result.blob();
          console.log(result, data);
        }}
      />
    </>
  );
};
