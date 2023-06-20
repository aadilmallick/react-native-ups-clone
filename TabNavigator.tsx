import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomersScreen from "./screens/CustomersScreen";
import OrdersScreen from "./screens/OrdersScreen";
import { Icon } from "@rneui/themed";
import colors from "tailwindcss/colors";
import { useTheme, useThemeMode } from "@rneui/themed";

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveBackgroundColor: theme.colors.white,
        tabBarActiveBackgroundColor: theme.colors.white,
      }}
    >
      <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" color={color} size={size} type="entypo" />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="box" color={color} size={size} type="entypo" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
