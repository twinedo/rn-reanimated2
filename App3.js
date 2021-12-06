import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {View, Button, StyleSheet, Text, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

export default function AnimatedStyleUpdateExample({children}) {
  const translationY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translationY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      isScrolling.value = true;
    },
    onEndDrag: (e) => {
      isScrolling.value = false;
    },
  });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translationY.value,
        },
      ],
    };
  });

  return (
    // <PanGestureHandler onGestureEvent={gestureHandler}>
    //   <Animated.View style={[styles.box, animatedStyle]} />
    // </PanGestureHandler>
    <View style={styles.container}>
      
      <Animated.ScrollView
        style={styles.scroll}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <View>
          <Text>Test</Text>
          <Text>Test</Text>
          <Text>Test</Text>
          <Text>Test</Text>
          <Text>Test</Text>
          <Text>Test</Text>
          <Text>Test</Text>
          <Text>Test</Text>
        </View>
      </Animated.ScrollView>
      <Animated.View style={[styles.box, stylez]} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: 150,
    backgroundColor: 'red',
  },
  scroll: {
    height: 100,
    backgroundColor: 'yellow'
  }
});
