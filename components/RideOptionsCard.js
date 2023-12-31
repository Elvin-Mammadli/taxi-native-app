import { useState } from "react";
import tw from "twrnc";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/base"
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: '1',
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: '2',
    title: "Uber-XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8"
  },
  {
    id: '3',
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  }
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity style={tw`absolute top-3 z-1 left-5 p-3 rounded-full`}
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { image, title, multiplier, id }, item }) => (
          <TouchableOpacity style={tw`flex-row items-center justify-between px-10 ${id === selected?.id ? 'bg-gray-200' : ''} `}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain"
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} travel time</Text>
            </View>
            <Text style={tw`text-xl`}>{
              new Intl.NumberFormat('az-AZ', {
                style: 'currency',
                currency: 'AZN'
              }).format((travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier / 500))
            }</Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected ? "bg-gray-300" : ""}`}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
