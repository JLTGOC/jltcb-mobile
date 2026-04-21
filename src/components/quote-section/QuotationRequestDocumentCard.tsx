import * as Print from "expo-print";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	Button,
	Dialog,
	IconButton,
	Menu,
	Portal,
	Text,
	TextInput,
} from "react-native-paper";

import type { Document } from "@/src/types/quotations";
import { handleFileOpen } from "@/src/utils/handleFileOpen";

interface QuotationRequestDocumentCardProps {
	document: Partial<Document> & { file_name: string; file_url?: string };
	showRemoveButton?: boolean;
	onRemove?: () => void;
	onViewPress?: (url?: string) => void | Promise<void>;
	onRename?: (newFileName: string) => void | Promise<unknown>;
}

export default function QuotationRequestDocumentCard({
	document,
	showRemoveButton,
	onRemove,
	onViewPress,
	onRename,
}: QuotationRequestDocumentCardProps) {
	const [visible, setVisible] = useState(false);
	const [renameVisible, setRenameVisible] = useState(false);
	const [renameFileName, setRenameFileName] = useState("");
	const [renameError, setRenameError] = useState<string | null>(null);
	const [isRenaming, setIsRenaming] = useState(false);

	const handleViewPress = async () => {
		setVisible(false);

		if (onViewPress) {
			await onViewPress(document.file_url);
			return;
		}

		await handleFileOpen(document.file_url);
	};

	const handlePrintPress = async () => {
		try {
			await Print.printAsync({
				uri: document.file_url,
			});
		} catch (error) {
			console.error("Print error:", error);
		}
		setVisible(false);
	};

	const openRenameDialog = () => {
		setVisible(false);
		setRenameError(null);
		setRenameFileName("");
		setRenameVisible(true);
	};

	const handleRenamePress = async () => {
		const trimmedFileName = renameFileName.trim();

		if (!trimmedFileName) {
			setRenameError("File name is required.");
			return;
		}

		if (!onRename) {
			setRenameVisible(false);
			return;
		}

		try {
			setIsRenaming(true);
			await onRename(trimmedFileName);
			setRenameVisible(false);
			setRenameError(null);
			setRenameFileName("");
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Failed to rename file.";
			setRenameError(message);
		} finally {
			setIsRenaming(false);
		}
	};

	const menus = [
		{
			leadingIcon: "pencil",
			title: "Rename",
			onPress: openRenameDialog,
		},
		{
			leadingIcon: "eye",
			title: "View",
			onPress: handleViewPress,
			disabled: !document.file_url,
		},
		{
			leadingIcon: "printer",
			title: "Print",
			onPress: handlePrintPress,
			disabled: !document.file_url,
		},
	];

	return (
		<View style={styles.container}>
			<View style={styles.icon}></View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{document.file_name}</Text>
				{/*<Text>{document.date}</Text>*/}
			</View>
			{showRemoveButton ? (
				<IconButton icon="close" size={20} onPress={onRemove} />
			) : (
				<Menu
					anchor={
						<IconButton
							icon="dots-vertical"
							size={20}
							onPress={() => setVisible(true)}
						/>
					}
					visible={visible}
					onDismiss={() => setVisible(false)}
					anchorPosition="bottom"
				>
					{menus.map((menu) => (
						<Menu.Item
							key={menu.title}
							title={menu.title}
							onPress={menu.onPress}
							leadingIcon={menu.leadingIcon}
							disabled={menu.disabled}
							dense
						/>
					))}
				</Menu>
			)}

			<Portal>
				<Dialog
					visible={renameVisible}
					onDismiss={() => {
						if (!isRenaming) {
							setRenameVisible(false);
							setRenameError(null);
							setRenameFileName("");
						}
					}}
				>
					<Dialog.Title>Rename File</Dialog.Title>
					<Dialog.Content>
						<TextInput
							mode="outlined"
							label={document.file_name}
							value={renameFileName}
							onChangeText={setRenameFileName}
							autoCapitalize="none"
							autoCorrect={false}
							error={!!renameError}
							disabled={isRenaming}
						/>
						{renameError ? (
							<Text style={styles.renameErrorText}>{renameError}</Text>
						) : null}
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={() => {
								setRenameVisible(false);
								setRenameError(null);
								setRenameFileName("");
							}}
							disabled={isRenaming}
						>
							Cancel
						</Button>
						<Button onPress={handleRenamePress} loading={isRenaming}>
							Save
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	icon: {
		width: 50,
	},
	textContainer: { flex: 1 },
	title: {
		color: "black",
	},
	renameErrorText: {
		marginTop: 8,
		color: "#B00020",
	},
});
