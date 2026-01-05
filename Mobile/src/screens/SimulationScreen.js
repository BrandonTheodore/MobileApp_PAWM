import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { executePythonCode } from "../utils/Api";

export default function SimulationScreen() {
  const [code, setCode] = useState('print("Hello World")');
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = async () => {
    if (!code.trim()) {
      Alert.alert("Error", "Please enter some code first!");
      return;
    }

    setIsLoading(true);
    setResult("Running...");

    const output = await executePythonCode(code);

    setResult(output);
    setIsLoading(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Header />

      {/* Input Section */}
      <View style={styles.card}>
        <Text style={styles.header}>Code (Python)</Text>
        <TextInput
          multiline
          style={styles.editor}
          placeholder="Ketik kode Python di sini..."
          value={code}
          onChangeText={setCode}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Run Button */}
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Run Code" onPress={handleRun} />
        )}
      </View>

      {/* Result Section */}
      <View style={styles.card}>
        <Text style={styles.header}>Result</Text>
        <TextInput
          multiline
          editable={false}
          style={[styles.editor, styles.resultEditor]}
          placeholder="Hasil akan ditampilkan di sini..."
          value={result}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginBottom: 8,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  editor: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    fontFamily: "monospace",
    borderRadius: 8,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  resultEditor: {
    backgroundColor: "#f0f0f0",
    color: "#333",
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
});
