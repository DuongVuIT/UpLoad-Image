import { StyleSheet } from "react-native";
import UpLoadSceen from "./src/screens/upload";
export default function App() {
  return <UpLoadSceen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
