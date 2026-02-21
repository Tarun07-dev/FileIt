export const uploadAvatarToCloudinary = async (
  imageUri: string,
  uid: string
) => {
  const data = new FormData();

  data.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "avatar.jpg",
  } as any);

  data.append("upload_preset", "avatar");

  // 🔥 Connect avatar to user UID
  data.append("public_id", `avatars/${uid}`);

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dsdm96rcc/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  return result.secure_url;
};
