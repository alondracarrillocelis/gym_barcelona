import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Dumbbell, Calendar, Users, Info } from 'lucide-react-native';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [deviceType, setDeviceType] = useState('smartphone');
  const router = useRouter();

  useEffect(() => {
    if (width <=280) {
      setDeviceType('wearable');
    } else if (width < 768) {
      setDeviceType('smartphone');
    } else if (width < 1024) {
      setDeviceType('tablet');
    } else {
      setDeviceType('tv');
    }
  }, [width]);

  const getFeatureCardStyle = () => {
    switch (deviceType) {
      case 'wearable':
        return {
          width: '90%',
          height: 60,
          marginBottom: 8,
        };
      case 'smartphone':
        return {
          width: '45%',
          height: 120,
          marginHorizontal: 8,
          marginBottom: 16,
        };
      case 'tablet':
        return {
          width: '30%',
          height: 150,
          marginHorizontal: 10,
          marginBottom: 20,
        };
      case 'tv':
        return {
          width: '22%',
          height: 180,
          marginHorizontal: 12,
          marginBottom: 24,
        };
      default:
        return {
          width: '45%',
          height: 120,
          marginHorizontal: 8,
          marginBottom: 16,
        };
    }
  };

  const getBannerStyle = () => {
    switch (deviceType) {
      case 'wearable':
        return {
          height: 80,
          marginBottom: 8,
        };
      case 'smartphone':
        return {
          height: 160,
          marginBottom: 16,
        };
      case 'tablet':
      case 'tv':
        return {
          height: 240,
          marginBottom: 24,
        };
    }
  };

  const getTextStyle = () => {
    switch (deviceType) {
      case 'wearable':
        return {
          title: { fontSize: 14, marginBottom: 4 },
          subtitle: { fontSize: 10 },
          featureTitle: { fontSize: 10 },
          sectionTitle: { fontSize: 12, marginBottom: 8 },
        };
      case 'smartphone':
        return {
          title: { fontSize: 24, marginBottom: 8 },
          subtitle: { fontSize: 16 },
          featureTitle: { fontSize: 14 },
          sectionTitle: { fontSize: 18, marginBottom: 16 },
        };
      case 'tablet':
        return {
          title: { fontSize: 32, marginBottom: 12 },
          subtitle: { fontSize: 20 },
          featureTitle: { fontSize: 18 },
          sectionTitle: { fontSize: 24, marginBottom: 20 },
        };
      case 'tv':
        return {
          title: { fontSize: 40, marginBottom: 16 },
          subtitle: { fontSize: 26 },
          featureTitle: { fontSize: 22 },
          sectionTitle: { fontSize: 32, marginBottom: 24 },
        };
    }
  };

  const featureCardStyle = getFeatureCardStyle();
  const bannerStyle = getBannerStyle();
  const textStyle = getTextStyle();

  const featuredClasses = [
    { id: 1, name: 'CrossFit', time: '08:00 - 09:00', instructor: 'Carlos P.' },
    { id: 2, name: 'Spinning', time: '10:00 - 11:00', instructor: 'María L.' },
    { id: 3, name: 'Yoga', time: '18:00 - 19:00', instructor: 'Ana R.' },
  ];

  const navigateToSection = (section: string) => {
    switch (section) {
      case 'entrenamientos':
        router.push('/');
        break;
      case 'horarios':
        router.push('/horarios');
        break;
      case 'reservaciones':
        router.push('/reservaciones');
        break;
      case 'informacion':
        router.push('/informacion');
        break;
    }
  };

  if (deviceType === 'wearable') {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerWearable}>
          <Text style={[styles.title, textStyle.title]}>Barcelona Fitness Center</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.quickAccessButton, { marginBottom: 8 }]}
          onPress={() => navigateToSection('horarios')}
        >
          <Calendar size={16} color="#10B981" />
          <Text style={{ fontSize: 10, marginLeft: 4, color: '#FFFFFF' }}>Clases Hoy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickAccessButton, { marginBottom: 8 }]}
          onPress={() => navigateToSection('reservaciones')}
        >
          <Users size={16} color="#10B981" />
          <Text style={{ fontSize: 10, marginLeft: 4, color: '#FFFFFF' }}>Reservar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickAccessButton}
          onPress={() => navigateToSection('informacion')}
        >
          <Info size={16} color="#10B981" />
          <Text style={{ fontSize: 10, marginLeft: 4, color: '#FFFFFF' }}>Ayuda</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, textStyle.title]}>Barcelona Fitness Center</Text>
        <Text style={[styles.subtitle, textStyle.subtitle]}>
          Tu entrenamiento, nuestra pasión.
        </Text>
      </View>

      <View style={[styles.banner, bannerStyle]}>
        <Image
          source={{ uri: 'https://www.pixelstalk.net/wp-content/uploads/images6/GYM-Fitness-Wallpaper-HD.jpg' }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerText}>SUPERA TUS LÍMITES</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, textStyle.sectionTitle]}>Acceso Rápido</Text>
      <View style={styles.featuresContainer}>
        <TouchableOpacity 
          style={[styles.featureCard, featureCardStyle]}
          onPress={() => navigateToSection('entrenamientos')}
        >
          <Dumbbell size={deviceType === 'tv' ? 32 : 24} color="#10B981" />
          <Text style={[styles.featureTitle, textStyle.featureTitle]}>Entrenamientos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.featureCard, featureCardStyle]}
          onPress={() => navigateToSection('horarios')}
        >
          <Calendar size={deviceType === 'tv' ? 32 : 24} color="#10B981" />
          <Text style={[styles.featureTitle, textStyle.featureTitle]}>Horarios</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.featureCard, featureCardStyle]}
          onPress={() => navigateToSection('reservaciones')}
        >
          <Users size={deviceType === 'tv' ? 32 : 24} color="#10B981" />
          <Text style={[styles.featureTitle, textStyle.featureTitle]}>Reservaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.featureCard, featureCardStyle]}
          onPress={() => navigateToSection('informacion')}
        >
          <Info size={deviceType === 'tv' ? 32 : 24} color="#10B981" />
          <Text style={[styles.featureTitle, textStyle.featureTitle]}>Información</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, textStyle.sectionTitle]}>Clases Destacadas</Text>
      <View style={styles.classesContainer}>
        {featuredClasses.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.classCard}
            onPress={() => navigateToSection('horarios')}
          >
            <Text style={styles.className}>{item.name}</Text>
            <Text style={styles.classTime}>{item.time}</Text>
            <Text style={styles.classInstructor}>{item.instructor}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#1A1A1A',
  },
  headerWearable: {
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    color: '#A0AEC0',
    marginBottom: 8,
  },
  banner: {
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
    color: '#FFFFFF',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 8,
  },
  featureCard: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    marginTop: 8,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  classesContainer: {
    padding: 16,
  },
  classCard: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  classTime: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 4,
  },
  classInstructor: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 2,
  },
  quickAccessButton: {
    flexDirection: 'row',
    backgroundColor: '#262626',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});