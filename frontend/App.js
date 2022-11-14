import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VendedoresScreen from './screens/Vendedores';
import { Ionicons } from '@expo/vector-icons';
import VentasScreen from './screens/Ventas';

const Tab = createBottomTabNavigator();

export default function App(){
    return( 
      <NavigationContainer>
         <Tab.Navigator
            initialRouteName='Vendedores'
            screenOptions={{
            tabBarActiveBackgroundColor:'#E1E1E1'
          }}>    
           
        <Tab.Screen name='Vendedores' component={VendedoresScreen} options={{title:'Vendedores', tabBarIcon:({color, size})=>(
            <Ionicons name="people-circle-outline" color='#23B574' size={30}></Ionicons>
          ) }}>          
        </Tab.Screen>
          <Tab.Screen name='Ventas' component={VentasScreen} options={{title:'Ventas', tabBarIcon:({color, size})=>(
            <Ionicons name="cash-outline" color='#23B574' size={30}></Ionicons>
          ) }}>          
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    ); 
};

