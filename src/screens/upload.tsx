import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config/firebase";
import "firebase/database";
import * as FileSystem from "expo-file-system";
const UpLoadSceen = () => {
  const [image, setImage] = useState<any>();
  const [uploading, setUploading] = useState(false);
  const [imageURLs, setImageURLs] = useState<any[]>([]);
  const uploadImage = async () => {
    setUploading(true);

    try {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);
      const snapshot = await ref.put(blob);

      // Lấy URL của ảnh sau khi tải lên Firebase Storage
      const downloadURL = await snapshot.ref.getDownloadURL();

      // Lưu URL vào Realtime Database
      await firebase?.database().ref("images").push({
        imageURL: downloadURL,
        // Các thông tin khác nếu cần
      });

      setUploading(false);
      Alert.alert("Photo uploaded!");
      setImage(null);
    } catch (error) {
      console.log(error);
      setUploading(false);
      Alert.alert("Failed to upload photo!");
    }
  };

  const pickImage = async () => {
    let result: string | any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = { uri: result.assets[0].uri };
    console.log(source);
    setImage(source);
  };
  useEffect(() => {
    const imagesRef = firebase?.database().ref("images");

    imagesRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const urls = Object.values(data).map((item: any) => item.imageURL);
        setImageURLs(urls);
      }
    });

    return () => imagesRef.off("value");
  }, []);
  console.log(imageURLs);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.buttonPick} onPress={pickImage}>
        <Text style={{ color: "black", fontSize: 22 }}>Pick an Image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ alignItems: "center", width: 300, height: 300 }}
          />
        )}
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.btnText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {imageURLs.map((url, index) => (
          <View style={styles.imageContainer} key={index}>
            <Image source={{ uri: url }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpLoadSceen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonPick: {
    borderWidth: 2,
    fontSize: 22,
    color: "black",
  },
  imageContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    marginTop: 10,
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
});
