import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
} from 'react-native-reanimated';

type Props = PropsWithChildren<{
}>;

export default function ParallaxScrollView({
  children,
}: Props) {

  return (
      <ScrollView>
        <View>{children}</View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
