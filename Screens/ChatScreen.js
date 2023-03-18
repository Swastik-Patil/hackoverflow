import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  ScrollView,
} from "react-native";
import { ref as dbref, update, get, child } from "firebase/database";
import { db } from "../database/firebaseDb";
import { SafeAreaView } from "react-native-safe-area-context";

const MyBubble = ({ text, type }) => {
  const bubbleStyle = type === "user" ? styles.userBubble : styles.serverBubble;

  return (
    <View style={[styles.bubble, bubbleStyle]}>
      <Text className="text-lg">{text}</Text>
    </View>
  );
};

const ChatScreen = ({ route, navigation }) => {
  const [dLen, setDLen] = useState(0);
  const [sol, setSol] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isUser, setIsUser] = useState(true);

  const { chatModel } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: chatModel });
    // handleSend2(chatModel);
  }, [messages]);

  function processinput() {
    setText("");
    // If query already exists
    get(
      child(
        dbref(db),
        "/Models/" + chatModel + "/" + text.replace(/[^a-zA-Z0-9 ]/g, "")
      )
    ).then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        Object.keys(data).forEach((key) => {
          setSol(data["solution"]);
        });
        handleSend2();
      } else {
        fetch(`https://api.openai.com/v1/chat/completions`, {
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: chatModel },
              { role: "user", content: text },
            ],
            temperature: 0.3,
            max_tokens: 2000,
          }),
          method: "POST",
          headers: {
            "content-type": " application/json",
            Authorization:
              "Bearer" + " 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",
          },
        })
          .then((response) => {
            if (response.ok) {
              response.json().then((json) => {
                setSol(json.choices[0].message.content);
                handleSend2();
              });
            } else {
              setSol("Some error occurred !");
            }
          })
          .finally(() => {
            storeQuery();
          });
      }
      setIsButtonDisabled(false);
    });
  }

  function storeQuery() {
    const newRef = text.replace(/[^a-zA-Z0-9 ]/g, "");
    update(dbref(db, "Models/" + chatModel + "/" + newRef + "/"), {
      query: text,
      solution: sol,
    })
      .catch((error) => {
        console.log("Error");
      })
  }

  const handleSend = async () => {
    setIsButtonDisabled(true);
    if (text === "") return;
    messages.push({ text, type: "user" });
    console.log(messages);
    setIsUser(!isUser);
    await processinput();
  };

  const handleSend2 = () => {
    navigation.setOptions({ title: chatModel });
    if (messages.length === 0) {
      setSol("Hello, I am " + chatModel);
      messages.push({ sol, type: "server" });
    } else {
      messages.push({ sol, type: "server" });
    }
    setIsUser(!isUser);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView style={styles.messageList}>
          {messages.map((message, index) =>
            index % 2 != 0 ? (
              <MyBubble key={index} text={message.sol} type={message.type} />
            ) : (
              <MyBubble key={index} text={message.text} type={message.type} />
            )
          )}
        </ScrollView>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message here..."
            onChangeText={setText}
            value={text}
          />
          <Button
            title="Send"
            style={styles.button}
            onPress={handleSend}
            disabled={isButtonDisabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  messageList: {
    flex: 1,
    padding: 10,
    marginBottom: 70,
  },
  bubble: {
    backgroundColor: "#e5e5ea",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    maxWidth: "70%",
    minWidth: "70%",
  },
  userBubble: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-end",
  },
  serverBubble: {
    backgroundColor: "#b3e6ff",
    alignSelf: "flex-start",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    color: "#ffffff",
    borderRadius: 15,
  },
});

export default ChatScreen;
