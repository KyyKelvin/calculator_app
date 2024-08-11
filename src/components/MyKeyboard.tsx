import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
  const [currentValue, setCurrentValue] = React.useState("0");
  const [operation, setOperation] = React.useState<string | null>(null);
  const [previousValue, setPreviousValue] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    setCurrentValue((prev) =>
      prev === "0" ? buttonValue : prev + buttonValue
    );
  };

  const handleOperationPress = (buttonValue: string) => {
    if (currentValue === "") return;

    if (result !== null) {
      setPreviousValue(result.toString());
      setResult(null);
    } else {
      setPreviousValue(currentValue);
    }

    setCurrentValue("");
    setOperation(buttonValue);
  };

  const clear = () => {
    setCurrentValue("0");
    setOperation(null);
    setPreviousValue(null);
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, { color: myColors.result }]
              : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]
          }
        >
          {result.toString()}
        </Text>
      );
    }
    if (currentValue && currentValue.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{currentValue}</Text>;
    }
    if (currentValue === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }
    if (currentValue.length > 5 && currentValue.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {currentValue}
        </Text>
      );
    }
    if (currentValue.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {currentValue}
        </Text>
      );
    }
  };

  const getResult = () => {
    const num1 = parseFloat(previousValue!);
    const num2 = parseFloat(currentValue);

    let tempResult: number | null = null;

    switch (operation) {
      case "+":
        tempResult = num1 + num2;
        break;
      case "-":
        tempResult = num1 - num2;
        break;
      case "*":
        tempResult = num1 * num2;
        break;
      case "/":
        tempResult = num1 / num2;
        break;
      case "％":
        tempResult = num1 % num2;
        break;
      default:
        break;
    }

    setCurrentValue(tempResult?.toString() ?? "0");
    setPreviousValue(null);
    setOperation(null);
    setResult(tempResult);
  };

  const handleSignChange = () => {
    if (currentValue) {
      setCurrentValue((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={Styles.screenSecondNumber}>
          {previousValue}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={clear} />
        <Button title="+/-" isGray onPress={handleSignChange} />
        <Button title="％" isGray onPress={() => handleOperationPress("％")} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="⌫" onPress={() => setCurrentValue(currentValue.slice(0, -1) || "0")} />
        <Button title="=" isBlue onPress={getResult} />
      </View>
    </View>
  );
}
