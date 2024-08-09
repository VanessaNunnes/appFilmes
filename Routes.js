import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TelaLogin from "./Telas/TelaLogin";
import TelaBuscarFilme from "./Telas/TelaBuscarFilme";
import TelaCadastro from './Telas/TelaCadastro'
import SplashScreen from "./Telas/SplashScreen";
import TelaRecomendados from "./Telas/TelaPopulares";
import TelaInformacoes from './Telas/TelaInformacoes';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTitleStyle: {
            color: 'white', 
          },
          headerTintColor: 'white'
        }}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={TelaLogin} options={{ headerShown: false }} />
        <Stack.Screen name='Cadastro' component={TelaCadastro} options={{ headerShown: false }}/>
        <Stack.Screen name='Auth' component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen name='Informações' component={TelaInformacoes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Drawer.Navigator screenOptions={{
      drawerActiveTintColor: 'white',
      drawerInactiveTintColor: 'white',
      headerTintColor: 'white',
      drawerStyle: { backgroundColor: 'black', width: '75%' },
      headerStyle: { backgroundColor: 'black' }
    }}>
      <Drawer.Screen name="Populares" component={TelaRecomendados} options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="movie-star" size={24} color="white" />
            ),
          }} />
      <Drawer.Screen name="Filmes" component={TelaBuscarFilme} options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="movie-search" size={24} color="white" />
            ),
          }}/>
    </Drawer.Navigator>
  );
}