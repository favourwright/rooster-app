import { Image, View, Text } from "react-native";

type ProfileDetailsProps = {
  name?: string;
  isAvailable?: boolean;
}
export default function ProfileDetails({ name, isAvailable }: ProfileDetailsProps) {
  return (
    <View className="flex-row items-center gap-2">
      <ProfileImage src="https://excellentcareclinics.nl/wp-content/uploads/2023/05/karinvosecc.png.webp" />
      <View className="flex-row items-center gap-2">
        <Text className="text-base font-medium text-gray-900 leading-tight">{name}</Text>
        {isAvailable && (
          <Text className="text-sm text-gray-600 leading-tight">Beschikbaar</Text>
        )}
      </View>
    </View>
  );
}

type ProfileImageProps = {
  src: string;
}
export const ProfileImage = ({ src }: ProfileImageProps) => {
  return (
    <View className="size-6 bg-red-700 rounded-full">
      <Image source={{ uri: src }} className="w-full h-full rounded-full" />
    </View>
  );
}