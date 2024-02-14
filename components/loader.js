import React from 'react';
import styles from '../styles';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ loading }) => (
  <Modal transparent={true} animationType="none" visible={loading}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator animating={loading} />
      </View>
    </View>
  </Modal>
);

export default Loader;