import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 60,
    width: '100%'
  },
  text: {
    fontSize: 22,
    lineHeight: 24,
    margin: 30,
  },
  modalContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 40,
    fontSize: 16,
    maxWidth: '70%',
    textAlign: 'center'
  }
});