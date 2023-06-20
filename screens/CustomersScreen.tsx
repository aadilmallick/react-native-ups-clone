import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon, Image, Input, useTheme, useThemeMode } from "@rneui/themed";
import { shadow_styles } from "../styles/shadows";
import { TabStackParamList } from "../TabNavigator";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS, GET_ORDERS } from "../graphql/queries";
import { Customer } from "../graphql/queryTypes";

export type CustomerScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function CustomersScreen() {
  const navigation = useNavigation<CustomerScreenNavigationProps>();

  const { theme } = useTheme();
  const [customerName, setCustomerName] = useState("");
  const { mode, setMode } = useThemeMode();
  const { toggleColorScheme } = useNativewindColorScheme();
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
    toggleColorScheme();
  };
  const { loading, data, error } = useQuery<{ getCustomers: Customer[] }>(
    GET_CUSTOMERS
  );

  console.log(data);

  return (
    <SafeAreaView
      className={`flex-1`}
      style={{
        backgroundColor: theme.colors.primary,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <ScrollView className="flex-1 relative">
        <Image
          source={{ uri: "https://links.papareact.com/3jc" }}
          containerStyle={{ width: "100%", height: 200 }}
          resizeMode="cover"
        />
        <Input
          placeholder="Search by Customer"
          value={customerName}
          onChangeText={setCustomerName}
          containerStyle={{
            backgroundColor: theme.colors.white,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        />
        <View
          className="absolute top-0 right-4 flex flex-row items-center bg-white rounded dark:bg-gray-800"
          style={[shadow_styles.shadow_subtle]}
        >
          <Icon name="moon" type="entypo" color={theme.colors.secondary} />
          <Switch
            value={mode === "light" ? false : true}
            onChange={toggleMode}
          />
        </View>
        {loading && (
          <View className="items-center">
            <ActivityIndicator size={40} />
          </View>
        )}
        {data?.getCustomers.map((customer) => (
          <CustomersCard key={customer.name} customer={customer} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

interface CustomersCardProps {
  customer: Customer;
}
function CustomersCard({ customer }: CustomersCardProps): React.FC {
  const { theme } = useTheme();

  return (
    <View
      className="p-2 my-4"
      style={{ backgroundColor: theme.colors.white }}
    ></View>
  );
}
