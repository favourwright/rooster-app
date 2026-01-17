import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function EmptyScreen() {
  return (
    <View className='bg-white flex-1 items-center justify-center gap-4'>
      <Text className='text-black text-5xl font-bold text-center'>Not Implemented</Text>
      <View>
        <Text className='text-black/40 text-xl font-semibold text-center'>This screen is not implemented yet</Text>
        <Link href={'/rooster'} className='text-black/60 text-xl font-semibold text-center'>Checkout rooster</Link>
      </View>
    </View>
  )
}