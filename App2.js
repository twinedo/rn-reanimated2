import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  useAnimatedScrollHandler,
  withDecay,
  useAnimatedGestureHandler,
  withDelay,
} from 'react-native-reanimated';
import {View, Button, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';

export default function AnimatedStyleUpdateExample(props) {
  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
    },
    onEnd: (evt) => {
      x.value = withDecay({
        velocity: evt.absoluteX,
        clamp: [0, 0], // optionally define boundaries for the animation
      });
      // x.value = withDelay(500, withTiming(0), {duration: 1000}, () => {
      //   x.value = 1;
      // });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  scroll: {
    height: 150,
    backgroundColor: 'yellow',
  },
});
