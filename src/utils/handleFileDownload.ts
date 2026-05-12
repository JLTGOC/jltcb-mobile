import { Directory, File, Paths } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

import { showToast } from "./showToast";

const { StorageAccessFramework } = FileSystem;

const downloadFile = async ({
	url,
	destination,
	token,
}: {
	url: string;
	destination: Directory;
	token?: string;
}) =>
	await File.downloadFileAsync(url, destination, {
		headers: token ? { Authorization: `Bearer ${token}` } : undefined,
	});

const androidSave = async (file: File) => {
	const permissions =
		await StorageAccessFramework.requestDirectoryPermissionsAsync();
	if (!permissions.granted) {
		showToast("Storage permission is required.");
		return;
	}

	const base64 = await FileSystem.readAsStringAsync(file.uri, {
		encoding: FileSystem.EncodingType.Base64,
	});
	const fileName = file.uri.split("/").pop();
	try {
		const uri = await StorageAccessFramework.createFileAsync(
			permissions.directoryUri,
			fileName!,
			file.type,
		);
		await FileSystem.writeAsStringAsync(uri, base64, {
			encoding: FileSystem.EncodingType.Base64,
		});
		showToast(`${fileName} has been saved.`);
	} catch (err) {
		showToast("Unable to save the file.");
		console.error(err);
	}
};

const save = async (file: File) => {
	if (Platform.OS !== "android") {
		await Sharing.shareAsync(file.uri, { mimeType: file.type });
		return;
	}

	androidSave(file);
};

export const handleSaveFile = async (url?: string, token?: string) => {
	if (!url) return;

	const destination = new Directory(Paths.cache, "files");
	try {
		if (destination.exists) {
			destination.delete();
		}
		destination.create();

		const res = await downloadFile({ url, destination, token });

		await save(res);
	} catch (err) {
		showToast("Unable to download the file.");
		console.error(err);
	}
};
