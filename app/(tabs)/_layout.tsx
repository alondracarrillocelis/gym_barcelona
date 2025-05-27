import { Tabs } from 'expo-router';
import { Platform, useWindowDimensions } from 'react-native';
import { Dumbbell, Calendar, BookCheck, ChartBar as BarChart2, Apple } from 'lucide-react-native';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  
  const getTabBarStyle = () => {
    if (width < 200) {
      return {
        height: 40,
        paddingBottom: 4,
        paddingTop: 4,
      };
    }
    
    if (width < 768) {
      return {
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
      };
    }
    
    return {
      height: 70,
      paddingBottom: 8,
      paddingTop: 8,
    };
  };
  
  const getIconSize = () => {
    if (width < 200) return 16;
    if (width < 768) return 22;
    return 28;
  };
  
  const iconSize = getIconSize();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#4A5568',
        tabBarStyle: {
          ...getTabBarStyle(),
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: width < 200 ? 8 : width < 768 ? 12 : 14,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#1A1A1A',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Dumbbell size={iconSize} color={color} />,
        }}
      />
      <Tabs.Screen
        name="horarios"
        options={{
          title: 'Horarios',
          tabBarIcon: ({ color }) => <Calendar size={iconSize} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reservaciones"
        options={{
          title: 'Reservar',
          tabBarIcon: ({ color }) => <BookCheck size={iconSize} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progreso"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color }) => <BarChart2 size={iconSize} color={color} />,
        }}
      />
      <Tabs.Screen
        name="nutricion"
        options={{
          title: 'Nutrición',
          tabBarIcon: ({ color }) => <Apple size={iconSize} color={color} />,
        }}
      />
    </Tabs>
  );
}