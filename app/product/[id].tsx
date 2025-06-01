import { useLocalSearchParams } from 'expo-router';
import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Page(props): ReactElement {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
