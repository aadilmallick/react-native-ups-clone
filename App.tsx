import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./TabNavigator";
import { StyleProvider } from "./StyleProvider";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://utebo.stepzen.net/api/unhinged-hound/__graphql",
  headers: {
    Authorization:
      "apikey utebo::stepzen.io+1000::99c81c482d5ef201e22f972ad5f5331b70d4a182c4bbeee3717a9844b19bf1d6",
  },
  cache: new InMemoryCache(),
});

// these types specify the route params for each screen
export type RootStackParamList = {
  Tab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StyleProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              statusBarTranslucent: true,
            }}
          >
            <Stack.Screen name="Tab" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </StyleProvider>
    </ApolloProvider>
  );
}
