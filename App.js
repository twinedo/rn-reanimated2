import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import {View, Button} from 'react-native';
import React, {useState} from 'react';

export default function AnimatedStyleUpdateExample(props) {
  const randomWidth = useSharedValue(10);

  const [isOpen, setIsOpen] = useState(false);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(randomWidth.value, config),
    };
  });

  const toggleHandler = () => {
    if (!isOpen) {
      randomWidth.value = 350;
      setIsOpen(true);
    } else {
      randomWidth.value = 50;
      setIsOpen(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <Animated.View
        style={[
          {width: 100, height: 80, backgroundColor: 'black', margin: 30},
          style,
        ]}
      />
      <Button title="toggle" onPress={toggleHandler} />
    </View>
  );
}
