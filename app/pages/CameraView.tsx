import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {IngredientsContext} from '../contexts/IngredientsContext';
import {getIngredientsFromImage} from '../utils/getIngredientsFromImage';

/*
 * 1. Take the picture
 * 2. Show a little animation
 * 3. Update the ingredients
 * 4. Navigate back to the ingredients page
 */

export const CameraView = ({navigation}: {navigation: any}) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const isFocused = useIsFocused();
  const [isActive, setIsActive] = useState(true); // [false, setIsActive
  const [photo, setPhoto] = useState<Blob | null>(null);
  const {ingredients, setIngredients} = React.useContext(IngredientsContext);

  const camera = useRef<Camera>(null);

  const device = useCameraDevice('back');
  if (device == null) return null;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const shutterPulseScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (photo) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: false, // set to true if supported
      }).start();

      // Make the shutter button pulse
      const minValue = 0.8;
      const maxValue = 1.1;
      Animated.loop(
        Animated.sequence([
          Animated.timing(shutterPulseScale, {
            toValue: maxValue,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(shutterPulseScale, {
            toValue: minValue,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(shutterPulseScale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [photo, animatedValue, shutterPulseScale]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -150], // Adjust this value to control the animation distance
  });

  const scale = shutterPulseScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Adjust this value to control the animation distance
  });

  const takePhoto = async () => {
    if (!camera.current || photo) return;
    const file = await camera.current.takePhoto({flash: 'off'});
    const filePath = file.path;

    const result = await fetch(`file://${filePath}`);
    const data = await result.blob();

    setIsActive(false);
    setPhoto(data);
    getIngredients(filePath);
    console.log('took picture', data);
  };

  const getIngredients = async (filePath: string) => {
    try {
      //convert image to base64
      const res = await getIngredientsFromImage(filePath);
      const newIngredients = [...ingredients, ...res];
      setIngredients(newIngredients);
      navigation.navigate('Ingredients');
    } catch (e) {
      console.log(e);
    }
  };

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
      {photo ? (
        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{translateY}],
          }}>
          <Image
            source={{uri: URL.createObjectURL(photo)}}
            className="rounded-xl"
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
          <Text style={{fontSize: 20, marginTop: 20, textAlign: 'center'}}>
            Analyzing ingredients...
          </Text>
        </Animated.View>
      ) : (
        <Camera
          ref={camera}
          photo={true}
          style={{flex: 1}}
          device={device}
          isActive={isActive}
        />
      )}

      {/* Shutter button */}
      <Animated.View className="absolute bottom-[40px] flex-row justify-center w-full">
        <TouchableOpacity
          disabled={photo !== null}
          className="bg-white rounded-full min-w-[75px] min-h-[75px] flex justify-center items-center"
          style={{
            transform: [{scale: scale}],
          }}
          onPress={takePhoto}>
          <Text className="text-3xl">✨</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};
