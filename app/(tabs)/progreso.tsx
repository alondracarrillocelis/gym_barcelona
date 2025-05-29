import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { CircleArrowUp as ArrowUpCircle, Activity, Dumbbell, Weight, Scale, Heart } from 'lucide-react-native';

// Datos simulados de progreso
const DATOS_PROGRESO = {
  pesos: [
    { fecha: '2025-04-01', valor: 82.5 },
    { fecha: '2025-04-08', valor: 81.8 },
    { fecha: '2025-04-15', valor: 81.0 },
    { fecha: '2025-04-22', valor: 80.3 },
    { fecha: '2025-04-29', valor: 79.8 },
    { fecha: '2025-05-05', valor: 79.2 },
  ],
  fuerza: [
    { fecha: '2025-04-01', valor: 70 },
    { fecha: '2025-04-08', valor: 75 },
    { fecha: '2025-04-15', valor: 80 },
    { fecha: '2025-04-22', valor: 82 },
    { fecha: '2025-04-29', valor: 85 },
    { fecha: '2025-05-05', valor: 90 },
  ],
  resistencia: [
    { fecha: '2025-04-01', valor: 65 },
    { fecha: '2025-04-08', valor: 68 },
    { fecha: '2025-04-15', valor: 72 },
    { fecha: '2025-04-22', valor: 75 },
    { fecha: '2025-04-29', valor: 80 },
    { fecha: '2025-05-05', valor: 85 },
  ],
  rendimiento: [
    { fecha: '2025-04-01', valor: 60 },
    { fecha: '2025-04-08', valor: 65 },
    { fecha: '2025-04-15', valor: 70 },
    { fecha: '2025-04-22', valor: 78 },
    { fecha: '2025-04-29', valor: 82 },
    { fecha: '2025-05-05', valor: 88 },
  ],
};

// Componente para renderizar gráficas sencillas
const SimpleGraph = ({ data, height, width, color, mostrarEtiquetas = true }) => {
  if (!data || data.length === 0) return null;
  
  const maxValue = Math.max(...data.map(item => item.valor));
  const minValue = Math.min(...data.map(item => item.valor));
  const range = maxValue - minValue || 1;
  
  return (
    <View style={{ height, width, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      {data.map((item, index) => {
        const normalizedValue = ((item.valor - minValue) / range) * 0.8 + 0.2; // Valor normalizado entre 0.2 y 1
        const barHeight = normalizedValue * height;
        
        return (
          <View key={index} style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                height: barHeight,
                width: 8,
                backgroundColor: color,
                borderRadius: 4,
              }}
            />
            {mostrarEtiquetas && (
              <Text style={{ fontSize: 10, marginTop: 4, color: '#4A5568' }}>
                {item.fecha.slice(-2)}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default function ProgresoScreen() {
  const { width } = useWindowDimensions();
  const [deviceType, setDeviceType] = useState('smartphone');
  const [metricaSeleccionada, setMetricaSeleccionada] = useState('pesos');
  
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
        metrica: 10,
        valor: 16,
        unidad: 8,
        label: 8
      };
      case 'smartphone': return {
        titulo: 22,
        subtitulo: 16,
        metrica: 14,
        valor: 24,
        unidad: 14,
        label: 12
      };
      case 'tablet': return {
        titulo: 28,
        subtitulo: 20,
        metrica: 18,
        valor: 32,
        unidad: 18,
        label: 16
      };
      case 'tv': return {
        titulo: 36,
        subtitulo: 24,
        metrica: 22,
        valor: 40,
        unidad: 22,
        label: 20
      };
      default: return {
        titulo: 22,
        subtitulo: 16,
        metrica: 14,
        valor: 24,
        unidad: 14,
        label: 12
      };
    }
  };
  
  const getGraphHeight = () => {
    switch (deviceType) {
      case 'wearable': return 60;
      case 'smartphone': return 120;
      case 'tablet': return 160;
      case 'tv': return 200;
      default: return 120;
    }
  };
  
  const fontSize = getFontSize();
  const graphHeight = getGraphHeight();
  
  // Datos actuales y evolución
  const datosActuales = {
    pesos: { valor: DATOS_PROGRESO.pesos[DATOS_PROGRESO.pesos.length - 1].valor, unidad: 'kg', tendencia: -3.3 },
    fuerza: { valor: DATOS_PROGRESO.fuerza[DATOS_PROGRESO.fuerza.length - 1].valor, unidad: '%', tendencia: 20 },
    resistencia: { valor: DATOS_PROGRESO.resistencia[DATOS_PROGRESO.resistencia.length - 1].valor, unidad: '%', tendencia: 20 },
    rendimiento: { valor: DATOS_PROGRESO.rendimiento[DATOS_PROGRESO.rendimiento.length - 1].valor, unidad: '%', tendencia: 28 },
  };
  
  // Vista optimizada para wearables
  if (deviceType === 'wearable') {
    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.titulo, { fontSize: fontSize.titulo }]}>Progreso</Text>
        
        <View style={styles.metricsContainerWearable}>
          <TouchableOpacity 
            style={[
              styles.metricCardWearable,
              metricaSeleccionada === 'pesos' && styles.metricaSeleccionadaWearable
            ]}
            onPress={() => setMetricaSeleccionada('pesos')}
          >
            <Scale size={14} color={metricaSeleccionada === 'pesos' ? '#FFFFFF' : '#4A5568'} />
            <Text style={[
              styles.metricLabelWearable,
              metricaSeleccionada === 'pesos' && styles.metricaLabelSeleccionadaWearable
            ]}>
              Peso
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.metricCardWearable,
              metricaSeleccionada === 'fuerza' && styles.metricaSeleccionadaWearable
            ]}
            onPress={() => setMetricaSeleccionada('fuerza')}
          >
            <Dumbbell size={14} color={metricaSeleccionada === 'fuerza' ? '#FFFFFF' : '#4A5568'} />
            <Text style={[
              styles.metricLabelWearable,
              metricaSeleccionada === 'fuerza' && styles.metricaLabelSeleccionadaWearable
            ]}>
              Fuerza
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.valueContainerWearable}>
          <Text style={[styles.valorActualWearable, { fontSize: fontSize.valor }]}>
            {datosActuales[metricaSeleccionada].valor}
            <Text style={[styles.unidadWearable, { fontSize: fontSize.unidad }]}>
              {datosActuales[metricaSeleccionada].unidad}
            </Text>
          </Text>
          
          <View style={styles.tendenciaContainerWearable}>
            <ArrowUpCircle 
              size={12} 
              color={datosActuales[metricaSeleccionada].tendencia > 0 ? '#48BB78' : '#10b981'} 
              style={{ transform: [{ rotate: datosActuales[metricaSeleccionada].tendencia > 0 ? '0deg' : '180deg' }] }}
            />
            <Text style={[
              styles.tendenciaTextoWearable, 
              { color: datosActuales[metricaSeleccionada].tendencia > 0 ? '#48BB78' : '#10b981' }
            ]}>
              {Math.abs(datosActuales[metricaSeleccionada].tendencia)}%
            </Text>
          </View>
        </View>
        
        <View style={styles.graphContainerWearable}>
          <SimpleGraph 
            data={DATOS_PROGRESO[metricaSeleccionada]} 
            height={60} 
            width={width - 32} 
            color="#10b981" 
            mostrarEtiquetas={false}
          />
        </View>
      </ScrollView>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.titulo, { fontSize: fontSize.titulo }]}>Mi Progreso Personal</Text>
      
      <View style={styles.metricsContainer}>
        <TouchableOpacity 
          style={[
            styles.metricCard,
            metricaSeleccionada === 'pesos' && styles.metricaSeleccionada
          ]}
          onPress={() => setMetricaSeleccionada('pesos')}
        >
          <Scale size={deviceType === 'tv' ? 28 : 20} color={metricaSeleccionada === 'pesos' ? '#FFFFFF' : '#4A5568'} />
          <Text style={[
            styles.metricLabel,
            { fontSize: fontSize.metrica },
            metricaSeleccionada === 'pesos' && styles.metricaLabelSeleccionada
          ]}>
            Peso
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.metricCard,
            metricaSeleccionada === 'fuerza' && styles.metricaSeleccionada
          ]}
          onPress={() => setMetricaSeleccionada('fuerza')}
        >
          <Dumbbell size={deviceType === 'tv' ? 28 : 20} color={metricaSeleccionada === 'fuerza' ? '#FFFFFF' : '#4A5568'} />
          <Text style={[
            styles.metricLabel,
            { fontSize: fontSize.metrica },
            metricaSeleccionada === 'fuerza' && styles.metricaLabelSeleccionada
          ]}>
            Fuerza
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.metricCard,
            metricaSeleccionada === 'resistencia' && styles.metricaSeleccionada
          ]}
          onPress={() => setMetricaSeleccionada('resistencia')}
        >
          <Heart size={deviceType === 'tv' ? 28 : 20} color={metricaSeleccionada === 'resistencia' ? '#FFFFFF' : '#4A5568'} />
          <Text style={[
            styles.metricLabel,
            { fontSize: fontSize.metrica },
            metricaSeleccionada === 'resistencia' && styles.metricaLabelSeleccionada
          ]}>
            Resistencia
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.metricCard,
            metricaSeleccionada === 'rendimiento' && styles.metricaSeleccionada
          ]}
          onPress={() => setMetricaSeleccionada('rendimiento')}
        >
          <Activity size={deviceType === 'tv' ? 28 : 20} color={metricaSeleccionada === 'rendimiento' ? '#FFFFFF' : '#4A5568'} />
          <Text style={[
            styles.metricLabel,
            { fontSize: fontSize.metrica },
            metricaSeleccionada === 'rendimiento' && styles.metricaLabelSeleccionada
          ]}>
            Rendimiento
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.currentValueCard}>
        <Text style={[styles.metricaSubtitulo, { fontSize: fontSize.subtitulo }]}>
          {metricaSeleccionada === 'pesos' ? 'Peso Actual' : 
           metricaSeleccionada === 'fuerza' ? 'Nivel de Fuerza' :
           metricaSeleccionada === 'resistencia' ? 'Nivel de Resistencia' : 'Rendimiento General'}
        </Text>
        
        <View style={styles.valueContainer}>
          <Text style={[styles.valorActual, { fontSize: fontSize.valor }]}>
            {datosActuales[metricaSeleccionada].valor}
            <Text style={[styles.unidad, { fontSize: fontSize.unidad }]}>
              {datosActuales[metricaSeleccionada].unidad}
            </Text>
          </Text>
          
          <View style={styles.tendenciaContainer}>
            <ArrowUpCircle 
              size={deviceType === 'tv' ? 28 : 20} 
              color={datosActuales[metricaSeleccionada].tendencia > 0 ? '#48BB78' : '#10b981'} 
              style={{ transform: [{ rotate: datosActuales[metricaSeleccionada].tendencia > 0 ? '0deg' : '180deg' }] }}
            />
            <Text style={[
              styles.tendenciaTexto, 
              { fontSize: fontSize.metrica, color: datosActuales[metricaSeleccionada].tendencia > 0 ? '#48BB78' : '#10b981' }
            ]}>
              {Math.abs(datosActuales[metricaSeleccionada].tendencia)}%
            </Text>
          </View>
        </View>
        
        <Text style={[styles.tendenciaLabel, { fontSize: fontSize.label }]}>
          {metricaSeleccionada === 'pesos' 
            ? datosActuales[metricaSeleccionada].tendencia < 0 
              ? 'Disminución en los últimos 30 días' 
              : 'Aumento en los últimos 30 días'
            : datosActuales[metricaSeleccionada].tendencia > 0 
              ? 'Mejora en los últimos 30 días' 
              : 'Disminución en los últimos 30 días'
          }
        </Text>
      </View>
      
      <Text style={[styles.graficaSubtitulo, { fontSize: fontSize.subtitulo }]}>
        Evolución en los últimos 30 días
      </Text>
      
      <View style={styles.graphContainer}>
        <SimpleGraph 
          data={DATOS_PROGRESO[metricaSeleccionada]} 
          height={graphHeight} 
          width={width - 32} 
          color="#10b981" 
        />
      </View>
      
      <View style={styles.recordsContainer}>
        <Text style={[styles.recordsSubtitulo, { fontSize: fontSize.subtitulo }]}>
          Mis Récords Personales
        </Text>
        
        <View style={styles.recordsList}>
          <View style={styles.recordItem}>
            <View style={styles.recordIconContainer}>
              <Dumbbell size={deviceType === 'tv' ? 28 : 20} color="#FFFFFF" />
            </View>
            <View style={styles.recordDetails}>
              <Text style={[styles.recordName, { fontSize: fontSize.metrica }]}>
                Press de Banca
              </Text>
              <Text style={[styles.recordValue, { fontSize: fontSize.label }]}>
                85 kg
              </Text>
            </View>
          </View>
          
          <View style={styles.recordItem}>
            <View style={styles.recordIconContainer}>
              <Weight size={deviceType === 'tv' ? 28 : 20} color="#FFFFFF" />
            </View>
            <View style={styles.recordDetails}>
              <Text style={[styles.recordName, { fontSize: fontSize.metrica }]}>
                Sentadilla
              </Text>
              <Text style={[styles.recordValue, { fontSize: fontSize.label }]}>
                120 kg
              </Text>
            </View>
          </View>
          
          <View style={styles.recordItem}>
            <View style={styles.recordIconContainer}>
              <Activity size={deviceType === 'tv' ? 28 : 20} color="#FFFFFF" />
            </View>
            <View style={styles.recordDetails}>
              <Text style={[styles.recordName, { fontSize: fontSize.metrica }]}>
                Carrera 5K
              </Text>
              <Text style={[styles.recordValue, { fontSize: fontSize.label }]}>
                22:45 min
              </Text>
            </View>
          </View>
        </View>
      </View>
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
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  metricaSeleccionada: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  metricLabel: {
    fontWeight: '500',
    color: '#4A5568',
    marginLeft: 8,
  },
  metricaLabelSeleccionada: {
    color: '#FFFFFF',
  },
  currentValueCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricaSubtitulo: {
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  valorActual: {
    fontWeight: 'bold',
    color: '#171717',
  },
  unidad: {
    fontWeight: 'normal',
    color: '#4A5568',
  },
  tendenciaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tendenciaTexto: {
    fontWeight: '500',
    marginLeft: 4,
  },
  tendenciaLabel: {
    color: '#718096',
  },
  graficaSubtitulo: {
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 12,
  },
  graphContainer: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  recordsContainer: {
    marginBottom: 20,
  },
  recordsSubtitulo: {
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 12,
  },
  recordsList: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordDetails: {
    flex: 1,
  },
  recordName: {
    fontWeight: '500',
    color: '#171717',
  },
  recordValue: {
    color: '#4A5568',
  },
  // Estilos para wearables
  metricsContainerWearable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricCardWearable: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flex: 1,
    marginHorizontal: 2,
  },
  metricaSeleccionadaWearable: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  metricLabelWearable: {
    fontWeight: '500',
    color: '#4A5568',
    fontSize: 8,
    marginTop: 2,
  },
  metricaLabelSeleccionadaWearable: {
    color: '#FFFFFF',
  },
  valueContainerWearable: {
    alignItems: 'center',
    marginVertical: 8,
  },
  valorActualWearable: {
    fontWeight: 'bold',
    color: '#171717',
  },
  unidadWearable: {
    fontWeight: 'normal',
    color: '#4A5568',
  },
  tendenciaContainerWearable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tendenciaTextoWearable: {
    fontWeight: '500',
    marginLeft: 2,
    fontSize: 10,
  },
  graphContainerWearable: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
});