import React from "react";
import { Modal, View, StyleSheet } from "react-native";

const ModalShared = (props) => {
  return (
    <View>
      <Modal
        style={styles.modalContainer}
        animationType="slide"
        transparent={false}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(false);
        }}
      >
        <View style={styles.modalContent}>{props.content}</View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
});

export default ModalShared;
