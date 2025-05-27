import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, TouchableOpacity, Image } from 'react-native';

const informacionData = [
  {
    id: '1',
    titulo: 'Beneficios de una Alimentación Saludable',
    descripcion: 'Una dieta equilibrada mejora la energía, fortalece el sistema inmune y reduce el riesgo de enfermedades crónicas.',
    imagen: 'https://fondosmil.co/fondo/45498.jpg',
  },
  {
    id: '2',
    titulo: 'Consejo Diario',
    descripcion: 'Agrega al menos 5 porciones de frutas y verduras al día para mantener una buena salud digestiva.',
    imagen: 'https://media.istockphoto.com/id/1407863570/es/foto/innovaci%C3%B3n-a-trav%C3%A9s-de-ideas-e-ideas-de-inspiraci%C3%B3n-mano-humana-sosteniendo-bombilla-para.jpg?s=612x612&w=0&k=20&c=XRZD3JfnEvH9j4Aiyf3XTWrBGW2vuyBWTeDjduY-nFQ=',
  },
  {
    id: '3',
    titulo: 'Mito: "Comer después de las 8 PM engorda"',
    descripcion: 'No importa la hora, sino el balance calórico total del día.',
    imagen: 'https://media.istockphoto.com/id/1084458052/es/foto/hombre-con-sobrepeso-que-comer-una-hamburguesa.jpg?s=612x612&w=0&k=20&c=ljsYHERHsDy3oaBY9U6PP76fLVBUZofPwQu9824PHg8=',
  },
  {
    id: '4',
    titulo: 'Guía Visual del Plato Saludable',
    descripcion: 'Una comida equilibrada debe tener vegetales, proteínas, carbohidratos complejos y agua.',
    imagen: 'https://wallpapers.com/images/high/healthy-food-pictures-lpv23ze155y8d67c.webp',
  },
];

const InformacionGeneralScreen = () => {
  const { width } = useWindowDimensions();
  const [tipoDispositivo, setTipoDispositivo] = useState<'wearable' | 'smartphone' | 'tablet' | 'tv'>('smartphone');

  useEffect(() => {
    if (width <=280) setTipoDispositivo('wearable');
    else if (width < 768) setTipoDispositivo('smartphone');
    else if (width < 1024) setTipoDispositivo('tablet');
    else setTipoDispositivo('tv');
  }, [width]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      padding: tipoDispositivo === 'wearable' ? 8 : 16,
    },
    titulo: {
      fontSize: tipoDispositivo === 'tv' ? 32 : tipoDispositivo === 'tablet' ? 26 : 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#333',
      textAlign: 'center',
    },
    card: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    imagen: {
      width: '100%',
      height: tipoDispositivo === 'wearable' ? 80 : 160,
      borderRadius: 10,
      marginBottom: 12,
      resizeMode: 'cover',
    },
    tituloCard: {
      fontSize: tipoDispositivo === 'tv' ? 24 : tipoDispositivo === 'tablet' ? 20 : 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#000',
    },
    descripcion: {
      fontSize: tipoDispositivo === 'tv' ? 20 : tipoDispositivo === 'tablet' ? 16 : 14,
      color: '#555',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Información General</Text>
      {informacionData.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.imagen} style={styles.imagen} />
          <Text style={styles.tituloCard}>{item.titulo}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default InformacionGeneralScreen;
