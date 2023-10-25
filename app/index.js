// #NOTE: #TODO: Remember we don't have onChange in React-Native, instead we have `onChangeText` , otherwise it would be showing [Object object] if onChange is used

import { useState } from "react";
import { View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

// We use SafeAreaView so that our app text/components will not come/overlap any home/menu buttons of mobile
const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "", // removes index text at the top left
        }}
      />

      {/* We dont want to show vertical scrollbar so its false */}
      {/* We are writing this after Stack Screen as Stack Screen will not be scrollable and be fixed */}
      {/* showsVerticalScrollIndicator={false} ---> use it inside ScrollView below to hide horizontal sliding bar */}
      <ScrollView>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
