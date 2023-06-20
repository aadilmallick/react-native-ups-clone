- [Nativewind tips](#nativewind-tips)
  - [styled API](#styled-api)
  - [Retrieving theme values](#retrieving-theme-values)
  - [Troubleshooting](#troubleshooting)
  - [Dark mode](#dark-mode)
- [UI](#ui)
  - [Getting statusbar height](#getting-statusbar-height)
  - [Basic tab navigator](#basic-tab-navigator)
- [React Native Elements](#react-native-elements)
  - [Theme customization](#theme-customization)
  - [Dark mode](#dark-mode-1)
    - [Dark mode with nativewind](#dark-mode-with-nativewind)
- [Stepzen steps](#stepzen-steps)

# Nativewind tips

## styled API

The `styled()` function returns a component, and you can predefined the styles for that component. This allows you to apply styles on basic react native components without having to rewrite the styles all the time.

```javascript
const StyledText = styled(Text, "font-bold");
```

## Retrieving theme values

```javascript
import colors from "tailwindcss/colors";

<Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: colors.fuchsia["500"],
  }}
/>;
```

## Troubleshooting

Everytime a particular style in nativewind is not working, but it should be working, restart the cache with `npx expo start -c` and it should work.

## Dark mode

The `useColorScheme()` hook form nativewind returns the `colorScheme`, and the `toggleColorScheme` function. By setting the colorScheme to dark, all styles prefixed with `dark:` will be applied.

- `colorScheme` : a string either "light" or "dark"
- `toggleColorScheme` : a function that toggles the color scheme to "light" or "dark"

```javascript
import { useColorScheme } from "nativewind";

export default function Example() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Switch
      value={colorScheme === "light" ? false : true}
      onChange={toggleColorScheme}
      className="bg-white dark:bg-gray-800"
    />
  );
}
```

# UI

## Getting statusbar height

The statusbar height is stored on the expo `Constants` API, on `Constants.statusBarHeight`. We can use that for a padding top that will never reach the statusbar.

- Be sure to set the `statusBarTranslucent` option to true, to allow for a transparent status bar. This will allow the background color to be visible behind the status bar.

```javascript
<Stack.Navigator
  screenOptions={{
    headerShown: false,
    statusBarTranslucent: true,
  }}
/>
```

```javascript
import Constants from "expo-constants";

export default function CustomersScreen() {
  const statusBarPadding = `pt-[${Constants.statusBarHeight}]`;

  return (
    <SafeAreaView className={`flex-1 bg-white ${statusBarPadding}`}>
      // app here
    </SafeAreaView>
  );
}
```

## Basic tab navigator

```javascript
import { Icon } from "@rneui/themed";
import colors from "tailwindcss/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// specify there are two screens in the tab navigator, and define params later
export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.fuchsia["500"],
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
```

# React Native Elements

## Theme customization

Theme customization is easy with react native elements. We can use the `ThemeProvider` component to wrap our app, and pass in a theme object. The theme object is a javascript object that contains the colors we want to use in our app.

- Create a theme object with the `createTheme()` function.
- Apply the theme across our app by wrapping it in the `ThemeProvider` component.

All theme colors go by the same names, and we can add extra ones if we want, but the main thing here is that differenct versions of each color is used automatically depending on whether the color scheme for react native elements is light mode or dark mode.

We can change the color scheme for the theme using the `useThemeMode()` hook from react native elements.

```javascript
import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: "#59C1CC",
    secondary: "#ffb641",
  },
  darkColors: {
    primary: "#346B71",
    secondary: "#61593f",
  },
});

export const StyleProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
```

## Dark mode

Using the `useThemeMode` hook from react native elements, we can get access to the color scheme of our theme - not our system - and toggle it. Toggling the dark theme changes the colors we use in the theme, from `lightColors` to `darkColors`.

```javascript
const theme = createTheme({
  lightColors: {
    primary: "#59C1CC",
    secondary: "#ffb641",
  },
  darkColors: {
    primary: "#346B71",
    secondary: "#61593f",
  },
});
```

In the above example, the primary and secondary colors change depending on the color scheme. Everything else changes too, as you can see here: [](https://reactnativeelements.com/docs/customization/theme_object)

```javascript
import { Icon, useThemeMode } from "@rneui/themed";

const Example = () => {
  const { mode, setMode } = useThemeMode();
  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

  return (
    <>
      <Icon name="moon" type="entypo" color={theme.colors.secondary} />
      <Switch value={mode === "light" ? false : true} onChange={toggleMode} />
    </>
  );
};
```

### Dark mode with nativewind

- The `useColorScheme()` hook from nativewind returns the `colorScheme`, and the `toggleColorScheme` function. By setting the colorScheme to dark, all styles prefixed with `dark:` will be applied.
- Using the `useThemeMode` hook from react native elements, we can get access to the color scheme of our theme and toggle it.

```javascript
import { useColorScheme } from "nativewind";
import { useThemeMode } from "@rneui/themed";

const Example = () => {
  const { mode, setMode } = useThemeMode();
  const { toggleColorScheme } = useNativewindColorScheme();
  // toggle nativewind color scheme and react native elements color scheme
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
    toggleColorScheme();
  };

  return (
    <View className="bg-white dark:bg-gray-800">
      <Icon name="moon" type="entypo" color={theme.colors.secondary} />
      <Switch value={mode === "light" ? false : true} onChange={toggleMode} />
    </View>
  );
};
```

# Stepzen steps

Stepzen is a service that allows us to build graphql apis from rest apis, with just a little setup.

1. Create a new project on stepzen.com, using the stepzen cli. More details here: [](https://dashboard.stepzen.com/getting-started)
2. Use the `stepzen import curl` command to convert REST API data into graphql data.
3. Connect the to graphql app using apollo client.
