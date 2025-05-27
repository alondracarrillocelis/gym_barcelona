import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';

// Datos simulados de clases
const CLASES = [
  { id: 1, nombre: 'CrossFit', horario: '07:00 - 08:00', instructor: 'Carlos P.', nivel: 'Todos', dias: ['Lun', 'Mié', 'Vie'] },
  { id: 2, nombre: 'Spinning', horario: '08:00 - 09:00', instructor: 'María L.', nivel: 'Todos', dias: ['Lun', 'Mar', 'Jue'] },
  { id: 3, nombre: 'Yoga', horario: '09:00 - 10:00', instructor: 'Ana R.', nivel: 'Principiante', dias: ['Mar', 'Jue'] },
  { id: 4, nombre: 'Pilates', horario: '10:00 - 11:00', instructor: 'Laura S.', nivel: 'Intermedio', dias: ['Lun', 'Mié', 'Vie'] },
  { id: 5, nombre: 'Zumba', horario: '17:00 - 18:00', instructor: 'Roberto G.', nivel: 'Todos', dias: ['Lun', 'Mar', 'Jue'] },
  { id: 6, nombre: 'Funcional', horario: '18:00 - 19:00', instructor: 'Javier M.', nivel: 'Avanzado', dias: ['Lun', 'Mié', 'Vie'] },
  { id: 7, nombre: 'Boxeo', horario: '19:00 - 20:00', instructor: 'Miguel A.', nivel: 'Intermedio', dias: ['Mar', 'Jue'] },
  { id: 8, nombre: 'HIIT', horario: '20:00 - 21:00', instructor: 'Claudia V.', nivel: 'Avanzado', dias: ['Lun', 'Mié', 'Vie'] },
];

const DIAS_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function HorariosScreen() {
  const { width } = useWindowDimensions();
  const [deviceType, setDeviceType] = useState('smartphone');
  const [diaSeleccionado, setDiaSeleccionado] = useState('');
  const [clasesFiltradas, setClasesFiltradas] = useState(CLASES);
  
  // Determinar día actual
  useEffect(() => {
    const hoy = new Date();
    const diaHoy = DIAS_SEMANA[hoy.getDay()];
    setDiaSeleccionado(diaHoy);
    
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
    
    // Filtrar clases por día
    filtrarClasesPorDia(diaHoy);
  }, [width]);
  
  const filtrarClasesPorDia = (dia) => {
    if (dia === 'Todos') {
      setClasesFiltradas(CLASES);
    } else {
      const clasesDia = CLASES.filter(clase => clase.dias.includes(dia));
      setClasesFiltradas(clasesDia);
    }
  };
  
  const cambiarDia = (dia) => {
    setDiaSeleccionado(dia);
    filtrarClasesPorDia(dia);
  };
  
  // Estilos adaptados al dispositivo
  const getFontSize = () => {
    switch (deviceType) {
      case 'wearable': return {
        titulo: 16,
        subtitulo: 12,
        dia: 10,
        clase: 12,
        detalle: 8
      };
      case 'smartphone': return {
        titulo: 22,
        subtitulo: 16,
        dia: 14,
        clase: 16,
        detalle: 14
      };
      case 'tablet': return {
        titulo: 28,
        subtitulo: 20,
        dia: 18,
        clase: 20,
        detalle: 16
      };
      case 'tv': return {
        titulo: 36,
        subtitulo: 24,
        dia: 22,
        clase: 24,
        detalle: 20
      };
      default: return {
        titulo: 22,
        subtitulo: 16,
        dia: 14,
        clase: 16,
        detalle: 14
      };
    }
  };
  
  const fontSize = getFontSize();
  
  // Vista optimizada para wearables
  if (deviceType === 'wearable') {
    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.titulo, { fontSize: fontSize.titulo }]}>Horarios</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScrollWearable}>
          {DIAS_SEMANA.map((dia) => (
            <TouchableOpacity
              key={dia}
              style={[
                styles.diaButtonWearable,
                diaSeleccionado === dia && styles.diaSeleccionadoWearable
              ]}
              onPress={() => cambiarDia(dia)}
            >
              <Text 
                style={[
                  styles.diaTextoWearable,
                  diaSeleccionado === dia && styles.diaTextoSeleccionadoWearable
                ]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {clasesFiltradas.length > 0 ? (
          clasesFiltradas.map((clase) => (
            <View key={clase.id} style={styles.claseCardWearable}>
              <Text style={[styles.claseNombreWearable, { fontSize: fontSize.clase }]}>{clase.nombre}</Text>
              <Text style={[styles.claseDetalleWearable, { fontSize: fontSize.detalle }]}>{clase.horario}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noClasesWearable}>No hay clases este día</Text>
        )}
      </ScrollView>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={[styles.titulo, { fontSize: fontSize.titulo }]}>Horario de Clases</Text>
      
      <View style={styles.filtrosContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.diasScroll}
        >
          <TouchableOpacity
            style={[
              styles.diaButton,
              diaSeleccionado === 'Todos' && styles.diaSeleccionado
            ]}
            onPress={() => cambiarDia('Todos')}
          >
            <Text 
              style={[
                styles.diaTexto,
                { fontSize: fontSize.dia },
                diaSeleccionado === 'Todos' && styles.diaTextoSeleccionado
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          
          {DIAS_SEMANA.map((dia) => (
            <TouchableOpacity
              key={dia}
              style={[
                styles.diaButton,
                diaSeleccionado === dia && styles.diaSeleccionado
              ]}
              onPress={() => cambiarDia(dia)}
            >
              <Text 
                style={[
                  styles.diaTexto,
                  { fontSize: fontSize.dia },
                  diaSeleccionado === dia && styles.diaTextoSeleccionado
                ]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.clasesContainer}>
        {clasesFiltradas.length > 0 ? (
          clasesFiltradas.map((clase) => (
            <TouchableOpacity key={clase.id} style={styles.claseCard}>
              <View style={styles.claseHeader}>
                <Text style={[styles.claseNombre, { fontSize: fontSize.clase }]}>{clase.nombre}</Text>
                <View style={[
                  styles.nivelBadge,
                  clase.nivel === 'Principiante' && styles.nivelPrincipiante,
                  clase.nivel === 'Intermedio' && styles.nivelIntermedio,
                  clase.nivel === 'Avanzado' && styles.nivelAvanzado,
                ]}>
                  <Text style={styles.nivelTexto}>{clase.nivel}</Text>
                </View>
              </View>
              
              <View style={styles.claseDetalles}>
                <Text style={[styles.claseDetalle, { fontSize: fontSize.detalle }]}>
                  <Text style={styles.claseDetalleLabel}>Horario: </Text>
                  {clase.horario}
                </Text>
                <Text style={[styles.claseDetalle, { fontSize: fontSize.detalle }]}>
                  <Text style={styles.claseDetalleLabel}>Instructor: </Text>
                  {clase.instructor}
                </Text>
                <Text style={[styles.claseDetalle, { fontSize: fontSize.detalle }]}>
                  <Text style={styles.claseDetalleLabel}>Días: </Text>
                  {clase.dias.join(', ')}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noClasesContainer}>
            <Text style={styles.noClases}>No hay clases programadas para este día</Text>
          </View>
        )}
      </ScrollView>
    </View>
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
  filtrosContainer: {
    marginBottom: 16,
  },
  diasScroll: {
    paddingVertical: 8,
  },
  diaButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  diaSeleccionado: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  diaTexto: {
    fontWeight: '500',
    color: '#4A5568',
  },
  diaTextoSeleccionado: {
    color: '#FFFFFF',
  },
  clasesContainer: {
    flex: 1,
  },
  claseCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E53E3E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  claseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  claseNombre: {
    fontWeight: 'bold',
    color: '#171717',
    flex: 1,
  },
  nivelBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#A0AEC0',
  },
  nivelPrincipiante: {
    backgroundColor: '#48BB78',
  },
  nivelIntermedio: {
    backgroundColor: '#ECC94B',
  },
  nivelAvanzado: {
    backgroundColor: '#E53E3E',
  },
  nivelTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  claseDetalles: {
    marginTop: 4,
  },
  claseDetalle: {
    color: '#4A5568',
    marginBottom: 4,
  },
  claseDetalleLabel: {
    fontWeight: '500',
  },
  noClasesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  noClases: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
  },
  // Estilos para wearables
  diasScrollWearable: {
    marginBottom: 8,
  },
  diaButtonWearable: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 4,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  diaSeleccionadoWearable: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  diaTextoWearable: {
    fontWeight: '500',
    color: '#4A5568',
    fontSize: 10,
  },
  diaTextoSeleccionadoWearable: {
    color: '#FFFFFF',
  },
  claseCardWearable: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#E53E3E',
  },
  claseNombreWearable: {
    fontWeight: 'bold',
    color: '#171717',
  },
  claseDetalleWearable: {
    color: '#4A5568',
  },
  noClasesWearable: {
    fontSize: 10,
    color: '#4A5568',
    textAlign: 'center',
    padding: 8,
  },
});