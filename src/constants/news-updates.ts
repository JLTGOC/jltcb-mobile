export const imageData = {
	title:
		"What Is the Prior Disclosure Program and How It Can Save Your Business from Customs Penalties",
	testImage1: require("@/assets/images/testImage.png"),
	testImage2: require("@/assets/images/testImage2.png"),
} as const;
// So here is the case: possible to receive image from the back end is the JSON and in the image tag thats how it would be used.
// JSON
// {
//   "image": "https://cdn.example.com/news/image-123.webp"
// }

// <Image source={{ uri: data.image }}
