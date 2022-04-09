import 'react-native-gesture-handler';
import React from 'react';
import Inicio from './views/inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'; 
import {  NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';

const Stack = createStackNavigator(); // aca instanciamos la funcion de createStackNavigator
// esto quiere decir, que la funcion se ejecuta y se guarda la ejecución en una variable.
// para saber cada propiedad que contiene Stack, se hace un console log. Se vé que devuelve un objeto, por lo que para acceder
// se hace de la siguiente manera: Stack.Screen

// Definir el tema
// para modificar los objetos que ya traer, hay que tomar una copia por ejemplo si quiero modificar el color colocar colors{ ...DefaultTheme.colors}, de esta manera copia todos los colores y los puedo modificar  a mi gusto
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}


// el NavigationContainer SIEMPRE wrappea la navegación, osea el stack navigator ó stack screen ó stack group
//El initialRouteName me indica la pantalla que defino como primera.

const App = () => {
  return (
    <>
    <PaperProvider>
        <NavigationContainer> 
          <Stack.Navigator 
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
              //permite modificar estilos de la fuente q esta en el encabezado
            }} //cambio apariencia de la parte superior
            // hacer referencia a las variables que contienen ciertos valores y si tengo que modificar una en la parte ** lo genero en cost theme
          >
            <Stack.Screen
              name="Inicio" // Le da un nombre a la screen (pantalla), se puede decir que es el título
              component={Inicio} // Este indica el componente a renderizar
            />

            <Stack.Screen
              name="NuevoCliente"
              component={NuevoCliente}
              options={{
                title: "Nuevo Cliente"
              }}
            />

            <Stack.Screen
              name="DetallesCliente"
              component={DetallesCliente}
              options={{
                title: "Detalles Cliente"
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
    </>
  );
};

// </Stack.Navigator> NAVIGATOR es la propiedad

export default App;
