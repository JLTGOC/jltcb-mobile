import { Directory, File, Paths } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

import { showToast } from "./showToast";

const { StorageAccessFramework } = FileSystem;

type DownloadOptions = {
	url: string;
	fileName: string;
	token?: string;
	cacheDir?: string;
};

const getCacheFile = ({
	fileName,
	cacheDir = "downloads",
}: {
	fileName: string;
	cacheDir?: string;
}) => {
	const directory = new Directory(Paths.cache, cacheDir);
	if (!directory.exists) {
		directory.create();
	}
	return new File(directory, fileName);
};

export const downloadFile = async ({
	url,
	fileName,
	token,
	cacheDir,
}: DownloadOptions) => {
	const file = getCacheFile({ fileName, cacheDir });

	if (file.exists) {
		return file;
	}

	return await File.downloadFileAsync(url, file, {
		headers: token
			? {
					Authorization: `Bearer ${token}`,
				}
			: undefined,
	});
};

const saveAndroid = async (file: File) => {
	const permissions =
		await StorageAccessFramework.requestDirectoryPermissionsAsync();

	if (!permissions.granted) {
		showToast("Storage permission is required.");
		return;
	}

	try {
		const base64 = await FileSystem.readAsStringAsync(file.uri, {
			encoding: FileSystem.EncodingType.Base64,
		});

		const uri = await StorageAccessFramework.createFileAsync(
			permissions.directoryUri,
			file.name,
			file.type ?? "application/octet-stream",
		);

		await FileSystem.writeAsStringAsync(uri, base64, {
			encoding: FileSystem.EncodingType.Base64,
		});

		showToast(`${file.name} has been saved.`);
	} catch (error) {
		console.error(error);
		showToast("Unable to save the file.");
	}
};

export const saveFile = async (file: File) => {
	if (Platform.OS === "android") {
		return saveAndroid(file);
	}

	return Sharing.shareAsync(file.uri, {
		mimeType: file.type,
	});
};

export const handleSaveFile = async ({
	url,
	fileName,
	token,
	cacheDir,
}: DownloadOptions) => {
	const file = await downloadFile({
		url,
		fileName,
		token,
		cacheDir,
	});

	await saveFile(file);
};
