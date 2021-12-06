import React, {useRef} from 'react';
import {View, Button, StyleSheet, PanResponder, Animated} from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function App() {
  const height = useSharedValue(50);
  const pan = useRef(new Animated.ValueXY()).current;

  // const [pan2, setPan2] = useState(new Animated.Value())

  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dy: pan.y,
      },
    ]),
  });

  // console.log(panResponder.panHandlers);

  return (
    <View>
      <Button
        onPress={() => (height.value = Math.random() * 300)}
        title="Hit"
      />
      <Animated.View style={[styles.box, style]}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.getLayout(), styles.box2]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 50,
    width: 150,
    backgroundColor: 'red',
  },
  box2: {
    height: 30,
    width: 30,
    backgroundColor: 'yellow',
  },
})