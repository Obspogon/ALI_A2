import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from "react-native";
import CheckBox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";

export default function App() {
	//vars
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const parcelTypes = ["Package", "Letter/Document"];
	const [type, setType] = useState(null);
	const [weight, setWeight] = useState();
	const initSignature = { Signature: false };
	const [signature, setSignature] = useState(initSignature);

	const [rate, setRate] = useState();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Delivericious</Text>

			<Text>Send from address:</Text>
			<TextInput value={from} placeholder="Sending Address" onChangeText={setFrom} keyboardType="default" autoCapitalize="words" autoCorrect={false}></TextInput>

			<Text>Send to address:</Text>
			<TextInput value={to} placeholder="Destination Address" onChangeText={setTo} keyboardType="default" autoCapitalize="words" autoCorrect={false}></TextInput>

			<Text>Parcel Type:</Text>
			<View style={{ flexDirection: "row", gap: 5 }}>
				<Text style={styles.label}>Selected:</Text>
				<Text style={styles.label}>{type}</Text>
			</View>
			<View style={{ alignItems: "flex-start" }}>
				{parcelTypes.map((option, index) => (
					<TouchableOpacity key={index} style={styles.radioContainer} onPress={() => setType(option)}>
						<View style={styles.radioCircle}>{type === option && <View style={styles.radioDot} />}</View>
						<Text style={styles.radioLabel}>{option}</Text>
					</TouchableOpacity>
				))}
			</View>

			<Text>Parcel Weight (in lbs.):</Text>
			<TextInput value={weight} placeholder="Weight" onChangeText={setWeight} keyboardType="decimal-pad" autoCorrect={false}></TextInput>

			<Text>Rate:</Text>
			<Picker style={styles.dropDownStyle} selectedValue={rate} onValueChange={(itemValue) => setRate(itemValue)}>
				<Picker.Item label="Pick one..." value={null} />
				<Picker.Item label="Standard" value="standard" />
				<Picker.Item label="Xpress Post" value="xpress" />
				<Picker.Item label="Priority Post" value="priority" />
			</Picker>

			<Text>Add-ons:</Text>
			<View style={styles.checkBoxContainer}>
				<CheckBox
					value={signature.Basic}
					onValueChange={(value) =>
						setSignature({
							...signature,
							Signature: value,
						})
					}
				/>
				<Text style={{ fontSize: 16 }}>Basic</Text>
			</View>

			<Pressable style={({ pressed }) => [styles.button, { backgroundColor: pressed ? "red" : "dodgerblue" }]} onPress={() => alert("Rate would be here.")}>
				<Text style={styles.buttonText}>Get Rate</Text>
			</Pressable>

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 50,
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
	},
	buttonText: {
		fontSize: 18,
		color: "white",
		fontWeight: "700",
	},
	radioContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginVertical: 5,
	},
	radioCircle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "dodgerblue",
		alignItems: "center",
		justifyContent: "center",
	},
	radioDot: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: "dodgerblue",
	},
	radioLabel: {
		fontSize: 16,
	},
	dropDownStyle: {
		width: "95%",
		borderColor: "red",
		borderWidth: 2,
		borderRadius: 5,
	},
	checkBoxContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginVertical: 5,
	},
});
