import { Image, StyleSheet, Platform, View, Button } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/context/authContext';

export default function ProfileScreen() {
  const { logOut } = useAuth();

  return (
    <>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </View>
      <View style={styles.stepContainer}>
        <Button title="Log Out" onPress={logOut} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
