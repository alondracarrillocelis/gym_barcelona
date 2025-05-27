import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Utensils, Coffee, Clock, Banana, Search } from 'lucide-react-native';

// Datos simulados de planes nutricionales
const PLANES_NUTRICIONALES = [
  { 
    id: 1, 
    nombre: 'Plan Pérdida de Peso', 
    descripcion: 'Ideal para reducir grasa corporal manteniendo la masa muscular', 
    calorias: 1800,
    macros: { proteinas: 40, carbohidratos: 30, grasas: 30 },
    imagen: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'
  },
  { 
    id: 2, 
    nombre: 'Plan Ganancia Muscular', 
    descripcion: 'Maximiza el crecimiento muscular con superávit calórico', 
    calorias: 2800,
    macros: { proteinas: 35, carbohidratos: 45, grasas: 20 },
    imagen: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg'
  },
  { 
    id: 3, 
    nombre: 'Plan Mantenimiento', 
    descripcion: 'Equilibrio nutricional para mantener tu composición corporal', 
    calorias: 2300,
    macros: { proteinas: 30, carbohidratos: 40, grasas: 30 },
    imagen: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg'
  },
  { 
    id: 4, 
    nombre: 'Plan Definición', 
    descripcion: 'Reduce grasa preservando al máximo tu masa muscular', 
    calorias: 2000,
    macros: { proteinas: 45, carbohidratos: 25, grasas: 30 },
    imagen: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg'
  },
];

// Datos simulados de recetas saludables
const RECETAS_SALUDABLES = [
  { 
    id: 1, 
    nombre: 'Bowl de Proteínas', 
    tiempoPrep: '15 min', 
    calorias: 450,
    proteinas: 35,
    tipo: 'Desayuno',
    imagen: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'
  },
  { 
    id: 2, 
    nombre: 'Ensalada de Quinoa', 
    tiempoPrep: '20 min', 
    calorias: 380,
    proteinas: 18,
    tipo: 'Almuerzo',
    imagen: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg'
  },
  { 
    id: 3, 
    nombre: 'Pollo al Horno con Vegetales', 
    tiempoPrep: '40 min', 
    calorias: 520,
    proteinas: 42,
    tipo: 'Cena',
    imagen: 'https://images.pexels.com/photos/262945/pexels-photo-262945.jpeg'
  },
  { 
    id: 4, 
    nombre: 'Batido de Proteínas', 
    tiempoPrep: '5 min', 
    calorias: 280,
    proteinas: 30,
    tipo: 'Snack',
    imagen: 'https://images.pexels.com/photos/775030/pexels-photo-775030.jpeg'
  },
];

export default function NutricionScreen() {
  const { width } = useWindowDimensions();
  const [deviceType, setDeviceType] = useState('smartphone');
  const [seccionActiva, setSeccionActiva] = useState('planes');
  
  useEffect(() => {
    // Determinar tipo de dispositivo
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
  
  // Configuración de estilos según dispositivo
  const getFontSize = () => {
    switch (deviceType) {
      case 'wearable': return {
        titulo: 14,
        subtitulo: 10,
        boton: 10,
        cardTitulo: 12,
        cardDetalle: 8
      };
      case 'smartphone': return {
        titulo: 22,
        subtitulo: 16,
        boton: 14,
        cardTitulo: 16,
        cardDetalle: 14
      };
      case 'tablet': return {
        titulo: 28,
        subtitulo: 20,
        boton: 18,
        cardTitulo: 20,
        cardDetalle: 16
      };
      case 'tv': return {
        titulo: 36,
        subtitulo: 24,
        boton: 22,
        cardTitulo: 24,
        cardDetalle: 20
      };
      default: return {
        titulo: 22,
        subtitulo: 16,
        boton: 14,
        cardTitulo: 16,
        cardDetalle: 14
      };
    }
  };
  
  const fontSize = getFontSize();
  
  // Vista optimizada para wearables
  if (deviceType === 'wearable') {
    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.titulo, { fontSize: fontSize.titulo }]}>Nutrición</Text>
        
        <View style={styles.seccionesWearable}>
          <TouchableOpacity
            style={[
              styles.seccionButtonWearable,
              seccionActiva === 'planes' && styles.seccionActivaWearable
            ]}
            onPress={() => setSeccionActiva('planes')}
          >
            <Text style={[
              styles.seccionTextoWearable,
              seccionActiva === 'planes' && styles.seccionTextoActivoWearable
            ]}>
              Planes
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.seccionButtonWearable,
              seccionActiva === 'recetas' && styles.seccionActivaWearable
            ]}
            onPress={() => setSeccionActiva('recetas')}
          >
            <Text style={[
              styles.seccionTextoWearable,
              seccionActiva === 'recetas' && styles.seccionTextoActivoWearable
            ]}>
              Recetas
            </Text>
          </TouchableOpacity>
        </View>
        
        {seccionActiva === 'planes' ? (
          <View>
            {PLANES_NUTRICIONALES.slice(0, 2).map((plan) => (
              <TouchableOpacity key={plan.id} style={styles.planCardWearable}>
                <Text style={styles.planTituloWearable}>{plan.nombre}</Text>
                <Text style={styles.planCaloriasWearable}>{plan.calorias} cal</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View>
            {RECETAS_SALUDABLES.slice(0, 2).map((receta) => (
              <TouchableOpacity key={receta.id} style={styles.recetaCardWearable}>
                <Text style={styles.recetaTituloWearable}>{receta.nombre}</Text>
                <Text style={styles.recetaDetalleWearable}>{receta.tiempoPrep}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.titulo, { fontSize: fontSize.titulo }]}>Nutrición</Text>
      
      <View style={styles.seccionesContainer}>
        <TouchableOpacity
          style={[
            styles.seccionButton,
            seccionActiva === 'planes' && styles.seccionActiva
          ]}
          onPress={() => setSeccionActiva('planes')}
        >
          <Utensils size={deviceType === 'tv' ? 28 : 20} color={seccionActiva === 'planes' ? '#FFFFFF' : '#4A5568'} />
          <Text style={[
            styles.seccionTexto,
            { fontSize: fontSize.boton },
            seccionActiva === 'planes' && styles.seccionTextoActivo
          ]}>
            Planes Nutricionales
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.seccionButton,
            seccionActiva === 'recetas' && styles.seccionActiva
          ]}
          onPress={() => setSeccionActiva('recetas')}
        >
          <Coffee size={deviceType === 'tv' ? 28 : 20} color={seccionActiva === 'recetas' ? '#FFFFFF' : '#4A5568'} />
          <Text style={[
            styles.seccionTexto,
            { fontSize: fontSize.boton },
            seccionActiva === 'recetas' && styles.seccionTextoActivo
          ]}>
            Recetas Saludables
          </Text>
        </TouchableOpacity>
      </View>
      
      {seccionActiva === 'planes' && (
        <View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={deviceType === 'tv' ? 24 : 18} color="#4A5568" style={styles.searchIcon} />
              <Text style={[styles.searchPlaceholder, { fontSize: fontSize.boton }]}>
                Buscar planes nutricionales...
              </Text>
            </View>
          </View>
          
          <Text style={[styles.subtitulo, { fontSize: fontSize.subtitulo }]}>
            Planes Nutricionales Recomendados
          </Text>
          
          <View style={styles.planesContainer}>
            {PLANES_NUTRICIONALES.map((plan) => (
              <TouchableOpacity key={plan.id} style={styles.planCard}>
                <Image 
                  source={{ uri: plan.imagen }} 
                  style={styles.planImagen}
                  resizeMode="cover"
                />
                <View style={styles.planInfo}>
                  <Text style={[styles.planTitulo, { fontSize: fontSize.cardTitulo }]}>
                    {plan.nombre}
                  </Text>
                  <Text style={[styles.planDescripcion, { fontSize: fontSize.cardDetalle }]}>
                    {plan.descripcion}
                  </Text>
                  <View style={styles.planEstadisticas}>
                    <View style={styles.planEstadistica}>
                      <Text style={[styles.planEstadisticaValor, { fontSize: fontSize.cardDetalle }]}>
                        {plan.calorias}
                      </Text>
                      <Text style={[styles.planEstadisticaLabel, { fontSize: Math.max(10, fontSize.cardDetalle - 4) }]}>
                        calorías
                      </Text>
                    </View>
                    
                    <View style={styles.macrosContainer}>
                      <View style={styles.macroItem}>
                        <View style={[styles.macroBarra, { backgroundColor: '#48BB78', width: `${plan.macros.proteinas}%` }]} />
                        <Text style={[styles.macroTexto, { fontSize: Math.max(10, fontSize.cardDetalle - 4) }]}>
                          P: {plan.macros.proteinas}%
                        </Text>
                      </View>
                      <View style={styles.macroItem}>
                        <View style={[styles.macroBarra, { backgroundColor: '#ECC94B', width: `${plan.macros.carbohidratos}%` }]} />
                        <Text style={[styles.macroTexto, { fontSize: Math.max(10, fontSize.cardDetalle - 4) }]}>
                          C: {plan.macros.carbohidratos}%
                        </Text>
                      </View>
                      <View style={styles.macroItem}>
                        <View style={[styles.macroBarra, { backgroundColor: '#F56565', width: `${plan.macros.grasas}%` }]} />
                        <Text style={[styles.macroTexto, { fontSize: Math.max(10, fontSize.cardDetalle - 4) }]}>
                          G: {plan.macros.grasas}%
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <TouchableOpacity style={styles.verMasButton}>
                    <Text style={[styles.verMasTexto, { fontSize: Math.max(12, fontSize.cardDetalle - 2) }]}>
                      Ver Detalles
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      
      {seccionActiva === 'recetas' && (
        <View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={deviceType === 'tv' ? 24 : 18} color="#4A5568" style={styles.searchIcon} />
              <Text style={[styles.searchPlaceholder, { fontSize: fontSize.boton }]}>
                Buscar recetas...
              </Text>
            </View>
          </View>
          
          <View style={styles.filtrosContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={[styles.filtroButton, styles.filtroActivo]}>
                <Text style={[styles.filtroTexto, styles.filtroTextoActivo, { fontSize: Math.max(12, fontSize.boton - 2) }]}>
                  Todos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filtroButton}>
                <Text style={[styles.filtroTexto, { fontSize: Math.max(12, fontSize.boton - 2) }]}>
                  Desayuno
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filtroButton}>
                <Text style={[styles.filtroTexto, { fontSize: Math.max(12, fontSize.boton - 2) }]}>
                  Almuerzo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filtroButton}>
                <Text style={[styles.filtroTexto, { fontSize: Math.max(12, fontSize.boton - 2) }]}>
                  Cena
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filtroButton}>
                <Text style={[styles.filtroTexto, { fontSize: Math.max(12, fontSize.boton - 2) }]}>
                  Snacks
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          
          <Text style={[styles.subtitulo, { fontSize: fontSize.subtitulo }]}>
            Recetas Populares
          </Text>
          
          <View style={styles.recetasGrid}>
            {RECETAS_SALUDABLES.map((receta) => (
              <TouchableOpacity key={receta.id} style={styles.recetaCard}>
                <Image 
                  source={{ uri: receta.imagen }} 
                  style={styles.recetaImagen}
                  resizeMode="cover"
                />
                <View style={styles.recetaOverlay}>
                  <View style={styles.recetaTipo}>
                    <Text style={styles.recetaTipoTexto}>{receta.tipo}</Text>
                  </View>
                </View>
                <View style={styles.recetaInfo}>
                  <Text style={[styles.recetaTitulo, { fontSize: fontSize.cardTitulo }]}>
                    {receta.nombre}
                  </Text>
                  <View style={styles.recetaDetalles}>
                    <View style={styles.recetaDetalle}>
                      <Clock size={deviceType === 'tv' ? 20 : 14} color="#4A5568" />
                      <Text style={[styles.recetaDetalleTexto, { fontSize: fontSize.cardDetalle }]}>
                        {receta.tiempoPrep}
                      </Text>
                    </View>
                    <View style={styles.recetaDetalle}>
                      <Banana size={deviceType === 'tv' ? 20 : 14} color="#4A5568" />
                      <Text style={[styles.recetaDetalleTexto, { fontSize: fontSize.cardDetalle }]}>
                        {receta.calorias} cal
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#171717',
    marginBottom: 16,
  },
  seccionesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  seccionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  seccionActiva: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  seccionTexto: {
    fontWeight: '500',
    color: '#4A5568',
    marginLeft: 8,
  },
  seccionTextoActivo: {
    color: '#FFFFFF',
  },
  subtitulo: {
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 12,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: '#A0AEC0',
  },
  filtrosContainer: {
    marginBottom: 16,
  },
  filtroButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filtroActivo: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  filtroTexto: {
    color: '#4A5568',
    fontWeight: '500',
  },
  filtroTextoActivo: {
    color: '#FFFFFF',
  },
  planesContainer: {
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  planImagen: {
    width: '100%',
    height: 160,
  },
  planInfo: {
    padding: 16,
  },
  planTitulo: {
    fontWeight: 'bold',
    color: '#171717',
    marginBottom: 4,
  },
  planDescripcion: {
    color: '#4A5568',
    marginBottom: 12,
  },
  planEstadisticas: {
    marginBottom: 16,
  },
  planEstadistica: {
    marginBottom: 8,
  },
  planEstadisticaValor: {
    fontWeight: 'bold',
    color: '#171717',
  },
  planEstadisticaLabel: {
    color: '#718096',
  },
  macrosContainer: {
    marginTop: 8,
  },
  macroItem: {
    marginBottom: 6,
  },
  macroBarra: {
    height: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  macroTexto: {
    color: '#718096',
  },
  verMasButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  verMasTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  recetasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recetaCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  recetaImagen: {
    width: '100%',
    height: 120,
  },
  recetaOverlay: {
    ...StyleSheet.absoluteFillObject,
    height: 120,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  recetaTipo: {
    backgroundColor: 'rgba(229, 62, 62, 0.9)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  recetaTipoTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  recetaInfo: {
    padding: 12,
  },
  recetaTitulo: {
    fontWeight: '600',
    color: '#171717',
    marginBottom: 8,
  },
  recetaDetalles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recetaDetalle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recetaDetalleTexto: {
    color: '#4A5568',
    marginLeft: 4,
  },
  // Estilos para wearables
  seccionesWearable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  seccionButtonWearable: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  seccionActivaWearable: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  seccionTextoWearable: {
    fontWeight: '500',
    color: '#4A5568',
    fontSize: 10,
  },
  seccionTextoActivoWearable: {
    color: '#FFFFFF',
  },
  planCardWearable: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#E53E3E',
  },
  planTituloWearable: {
    fontWeight: 'bold',
    color: '#171717',
    fontSize: 12,
  },
  planCaloriasWearable: {
    color: '#4A5568',
    fontSize: 10,
  },
  recetaCardWearable: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#E53E3E',
  },
  recetaTituloWearable: {
    fontWeight: 'bold',
    color: '#171717',
    fontSize: 12,
  },
  recetaDetalleWearable: {
    color: '#4A5568',
    fontSize: 10,
  },
});