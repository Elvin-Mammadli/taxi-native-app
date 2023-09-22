import React from "react";
import { Text, View, SafeAreaView, Image } from "react-native";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`p-5`}>
        <Image
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        />
      </View>

      <GooglePlacesAutocomplete
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        minLength={2}
        onPress={(data, details = null) => {
          console.log("data", data);
          console.log("details", details);
        }}
        fetchDetails={true}
        returnKeyType={"search"}
        enablePoweredByContainer={false}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        placeholder="Where from?"
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
      />

      <NavOptions />
    </SafeAreaView>
  );
};

export default HomeScreen;
