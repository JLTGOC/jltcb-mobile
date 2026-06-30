import { Stack } from "expo-router";

export default function ASLayout() {
<<<<<<< HEAD
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen
				name="image-viewer"
				options={{
					presentation: "transparentModal",
					animation: "fade",
					headerShown: false,
				}}
			/>
		</Stack>
	);
=======
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="image-viewer"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
    </Stack>
  );
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
}
