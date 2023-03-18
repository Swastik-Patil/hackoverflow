import React,{useState} from "react";
import { StyleSheet, Text, Button, View, FlatList, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { createDrawerNavigator } from '@react-navigation/drawer';

const DATA = [
  {
    id: "1",
    title: "Cricketer",
  },
  {
    id: "2",
    title: "Doctor",
  },
  {
    id: "3",
    title: "Computer Engineer",
  },
];
// const Drawer = createDrawerNavigator();

export default function HomeScreen({ navigation }) {
    function gotoChatScreen(title){
        navigation.navigate("Chat",{chatModel : title})
    }

  const Item = ({ title }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() =>{ console.log("Clicked"); navigation.navigate("Chat")}}>
        <Text>{title} </Text>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Pressable style={styles.button} onPress={()=>gotoChatScreen(item.title)}>
        <Text style={styles.title}>{item.title}</Text>
      </Pressable>
    </View>
  );
  return (
    // <Drawer.Navigator>
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
       {/* <Drawer.Screen name="Feedback" component={FeedbackScreen} /> */}
       {/* <Drawer.Screen name="Contact" component={ContactScreen} /> */}
     {/* </Drawer.Navigator> */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
  },
  item: {
    backgroundColor: "#5fbed9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button:{
    color:"#ffffff",
    borderRadius:15,
  },
  title :{
    color:"#ffffff",
  }
});
