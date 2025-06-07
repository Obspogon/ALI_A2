import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, ScrollView } from "react-native";
import CheckBox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";

export default function App() {
	//vars
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const parcelTypes = ["Package", "Letter/Document"];
	const [type, setType] = useState("Package");
	const [weight, setWeight] = useState(null);
	const [rate, setRate] = useState();
	const initSignature = { Signature: false };
	const [signature, setSignature] = useState(initSignature);

	return (
		<View style={styles.container}>
			<ScrollView>
				<Text style={styles.title}>Delivericious</Text>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Send from address:</Text>
					<TextInput style={styles.inputStyle} value={from} placeholder="Sending Address" onChangeText={setFrom} keyboardType="default" autoCapitalize="words" autoCorrect={false}></TextInput>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Send to address:</Text>
					<TextInput style={styles.inputStyle} value={to} placeholder="Destination Address" onChangeText={setTo} keyboardType="default" autoCapitalize="words" autoCorrect={false}></TextInput>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Parcel Type:</Text>
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
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Parcel Weight in lbs. (max for this type is {type === "Package" ? "44" : "1.1"}):</Text>
					<TextInput style={styles.inputStyle} value={weight} placeholder="Weight" onChangeText={setWeight} keyboardType="decimal-pad" autoCorrect={false}></TextInput>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Rate:</Text>
					<Text style={styles.inputLabel}>Standard: {type === "Package" ? "$12.99" : "$4.99"}</Text>
					<Text style={styles.inputLabel}>Xpress Post: {type === "Package" ? "$18.99" : "$9.99"}</Text>
					<Text style={styles.inputLabel}>Priority Post: {type === "Package" ? "$24.99" : "$14.99"}</Text>
					<Picker style={styles.dropDownStyle} selectedValue={rate} onValueChange={(itemValue) => setRate(itemValue)}>
						<Picker.Item label="Pick one..." value={null} />
						<Picker.Item label="Standard" value="standard" />
						<Picker.Item label="Xpress Post" value="xpress" />
						<Picker.Item label="Priority Post" value="priority" />
					</Picker>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Add-ons:</Text>
					<View style={styles.checkBoxContainer}>
						<CheckBox
							value={signature.Signature}
							onValueChange={(value) =>
								setSignature({
									...signature,
									Signature: value,
								})
							}
						/>
						<Text style={{ fontSize: 16 }}>Signature Option (+$2)</Text>
					</View>
				</View>
				<Pressable
					style={({ pressed }) => [styles.button, { backgroundColor: pressed ? "lightblue" : "dodgerblue" }]}
					onPress={() => {
						if (from === "") {
							alert("You need a source address.");
						} else if (to == "") {
							alert("You need a destination address.");
						} else if (weight === null) {
							alert("You need to enter a weight.");
						} else if ((type === "Package" && weight > 44) || (type === "Letter/Document" && weight > 1.1)) {
							alert("Your package is too heavy.");
						} else if (rate === null || rate === undefined) {
							alert("Select a package type.");
						} else {
							let subtotal = 0;
							switch (rate) {
								case "standard":
									subtotal = type === "Package" ? 12.99 : 4.99;
									break;
								case "xpress":
									subtotal = type === "Package" ? 18.99 : 9.99;
									break;
								case "priority":
									subtotal = type === "Package" ? 24.99 : 14.99;
									break;
							}
							subtotal += signature.Signature ? 2 : 0;
							let tax = subtotal * 0.13;
							alert(`Source address: ${from}\nDestination address: ${to}\nParcel Type: ${type}\nWeight: ${weight} lbs.\nRate: ${rate}\nSignature?: ${signature.Signature}\n\nCost with tax: $${Number((subtotal + tax).toFixed(2))}`);
						}
					}}
				>
					<Text style={styles.buttonText}>Get Rate</Text>
				</Pressable>
			</ScrollView>

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
		alignItems: "flex-start",
		paddingTop: 50,
		marginHorizontal: 10,
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
	},
	inputContainer: {
		flexDirection: "column",
		width: "100%",
		paddingVertical: 10,
	},
	inputLabel: {
		fontSize: 15,
		padding: 5,
	},
	inputStyle: {
		fontSize: 20,
		borderColor: "dodgerblue",
		borderWidth: 2,
		padding: 5,
		height: 50,
		width: "95%",
		borderRadius: 5,
	},
	button: {
		backgroundColor: "dodgerblue",
		padding: 10,
		alignItems: "center",
		alignSelf: "center",
		width: "100%",
		borderRadius: 10,
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
		borderColor: "dodgerblue",
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
