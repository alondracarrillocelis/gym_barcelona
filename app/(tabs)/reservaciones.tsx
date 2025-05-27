import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import { Calendar, Clock, User, CircleCheck as CheckCircle } from 'lucide-react-native';

// Datos simulados de clases disponibles para reservar
const CLASES_DISPONIBLES = [
  { id: 1, nombre: 'CrossFit', horario: '07:00 - 08:00', instructor: 'Carlos P.', capacidad: 20, disponibles: 8, fecha: '2025-05-05' },
  { id: 2, nombre: 'Spinning', horario: '08:00 - 09:00', instructor: 'María L.', capacidad: 15, disponibles: 5, fecha: '2025-05-05' },
  { id: 3, nombre: 'Yoga', horario: '09:00 - 10:00', instructor: 'Ana R.', capacidad: 12, disponibles: 3, fecha: '2025-05-05' },
  { id: 4, nombre: 'Pilates', horario: '10:00 - 11:00', instructor: 'Laura S.', capacidad: 10, disponibles: 4, fecha: '2025-05-05' },
  { id: 5, nombre: 'Zumba', horario: '17:00 - 18:00', instructor: 'Roberto G.', capacidad: 25, disponibles: 12, fecha: '2025-05-06' },
  { id: 6, nombre: 'Funcional', horario: '18:00 - 19:00', instructor: 'Javier M.', capacidad: 15, disponibles: 7, fecha: '2025-05-06' },
  { id: 7, nombre: 'Boxeo', horario: '19:00 - 20:00', instructor: 'Miguel A.', capacidad: 12, disponibles: 2, fecha: '2025-05-06' },
  { id: 8, nombre: 'HIIT', horario: '20:00 - 21:00', instructor: 'Claudia V.', capacidad: 18, disponibles: 9, fecha: '2025-05-06' },
];

export default function ReservacionesScreen() {
  const { width } = useWindowDimensions();
  const [deviceType, setDeviceType] = useState('smartphone');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('2025-05-05');
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [misReservaciones, setMisReservaciones] = useState([]);
  
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
    
    // Filtrar clases por fecha
    filtrarClasesPorFecha(fechaSeleccionada);
  }, [width]);
  
  const filtrarClasesPorFecha = (fecha) => {
    const clasesFecha = CLASES_DISPONIBLES.filter(clase => clase.fecha === fecha);
    setClasesDisponibles(clasesFecha);
  };
  
  const cambiarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    filtrarClasesPorFecha(fecha);
  };
  
  const realizarReservacion = (clase) => {
    // Verificar si ya está en las reservaciones
    const yaReservada = misReservaciones.some(reserva => reserva.id === clase.id);
    
    if (yaReservada) {
      Alert.alert('Ya tienes una reservación', 'Ya has reservado esta clase.');
      return;
    }
    
    // Verificar disponibilidad
    if (clase.disponibles <= 0) {
      Alert.alert('Clase llena', 'Lo sentimos, esta clase ya no tiene cupos disponibles.');
      return;
    }
    
    // Realizar reservación
    const nuevaReservacion = { ...clase };
    setMisReservaciones([...misReservaciones, nuevaReservacion]);
    
    // Actualizar disponibilidad
    const clasesActualizadas = clasesDisponibles.map(c => {
      if (c.id === clase.id) {
        return { ...c, disponibles: c.disponibles - 1 };
      }
      return c;
    });
    setClasesDisponibles(clasesActualizadas);
    
    Alert.alert('Reservación Exitosa', `Has reservado la clase de ${clase.nombre} para el ${formatearFecha(clase.fecha)} en el horario ${clase.horario}.`);
  };
  
  const cancelarReservacion = (reservacionId) => {
    // Buscar la reservación
    const reservacion = misReservaciones.find(r => r.id === reservacionId);
    
    if (!reservacion) return;
    
    // Eliminar de mis reservaciones
    const nuevasReservaciones = misReservaciones.filter(r => r.id !== reservacionId);
    setMisReservaciones(nuevasReservaciones);
    
    // Actualizar disponibilidad si la clase es para la fecha seleccionada
    if (reservacion.fecha === fechaSeleccionada) {
      const clasesActualizadas = clasesDisponibles.map(c => {
        if (c.id === reservacionId) {
          return { ...c, disponibles: c.disponibles + 1 };
        }
        return c;
      });
      setClasesDisponibles(clasesActualizadas);
    }
    
    Alert.alert('Reservación Cancelada', `Has cancelado tu reservación para la clase de ${reservacion.nombre}.`);
  };
  
  const formatearFecha = (fecha) => {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };
  
  // Estilos adaptados al dispositivo
  const getFontSize = () => {
    switch (deviceType) {
      case 'wearable': return {
        titulo: 14,
        subtitulo: 10,
        boton: 10,
        clase: 12,
        detalle: 8
      };
      case 'smartphone': return {
        titulo: 22,
        subtitulo: 16,
        boton: 14,
        clase: 16,
        detalle: 14
      };
      case 'tablet': return {
        titulo: 28,
        subtitulo: 20,
        boton: 18,
        clase: 20,
        detalle: 16
      };
      case 'tv': return {
        titulo: 36,
        subtitulo: 24,
        boton: 22,
        clase: 24,
        detalle: 20
      };
      default: return {
        titulo: 22,
        subtitulo: 16,
        boton: 14,
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
        <Text style={[styles.titulo, { fontSize: fontSize.titulo }]}>Reservas</Text>
        
        <View style={styles.fechasContainerWearable}>
          <TouchableOpacity
            style={[
              styles.fechaButtonWearable,
              fechaSeleccionada === '2025-05-05' && styles.fechaSeleccionadaWearable
            ]}
            onPress={() => cambiarFecha('2025-05-05')}
          >
            <Text style={[
              styles.fechaTextoWearable,
              fechaSeleccionada === '2025-05-05' && styles.fechaTextoSeleccionadaWearable
            ]}>
              Hoy
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.fechaButtonWearable,
              fechaSeleccionada === '2025-05-06' && styles.fechaSeleccionadaWearable
            ]}
            onPress={() => cambiarFecha('2025-05-06')}
          >
            <Text style={[
              styles.fechaTextoWearable,
              fechaSeleccionada === '2025-05-06' && styles.fechaTextoSeleccionadaWearable
            ]}>
              Mañana
            </Text>
          </TouchableOpacity>
        </View>
        
        {clasesDisponibles.map((clase) => (
          <View key={clase.id} style={styles.claseCardWearable}>
            <Text style={[styles.claseNombreWearable, { fontSize: fontSize.clase }]}>
              {clase.nombre}
            </Text>
            <Text style={[styles.claseDetalleWearable, { fontSize: fontSize.detalle }]}>
              {clase.horario}
            </Text>
            <TouchableOpacity
              style={[
                styles.reservarButtonWearable,
                clase.disponibles === 0 && styles.botonDeshabilitadoWearable
              ]}
              onPress={() => realizarReservacion(clase)}
              disabled={clase.disponibles === 0}
            >
              <Text style={styles.reservarTextoWearable}>
                {clase.disponibles > 0 ? 'Reservar' : 'Lleno'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={[styles.titulo, { fontSize: fontSize.titulo }]}>Reservaciones</Text>
      
      <View style={styles.fechasContainer}>
        <TouchableOpacity
          style={[
            styles.fechaButton,
            fechaSeleccionada === '2025-05-05' && styles.fechaSeleccionada
          ]}
          onPress={() => cambiarFecha('2025-05-05')}
        >
          <Calendar size={deviceType === 'tv' ? 28 : 20} color={fechaSeleccionada === '2025-05-05' ? '#FFFFFF' : '#4A5568'} />
          <Text style={[
            styles.fechaTexto,
            { fontSize: fontSize.boton },
            fechaSeleccionada === '2025-05-05' && styles.fechaTextoSeleccionada
          ]}>
            Hoy
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.fechaButton,
            fechaSeleccionada === '2025-05-06' && styles.fechaSeleccionada
          ]}
          onPress={() => cambiarFecha('2025-05-06')}
        >
          <Calendar size={deviceType === 'tv' ? 28 : 20} color={fechaSeleccionada === '2025-05-06' ? '#FFFFFF' : '#4A5568'} />
          <Text style={[
            styles.fechaTexto,
            { fontSize: fontSize.boton },
            fechaSeleccionada === '2025-05-06' && styles.fechaTextoSeleccionada
          ]}>
            Mañana
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.subtitulo, { fontSize: fontSize.subtitulo }]}>
        Clases Disponibles para {fechaSeleccionada === '2025-05-05' ? 'Hoy' : 'Mañana'}
      </Text>
      
      <ScrollView style={styles.clasesContainer}>
        {clasesDisponibles.map((clase) => (
          <View key={clase.id} style={styles.claseCard}>
            <View style={styles.claseHeader}>
              <Text style={[styles.claseNombre, { fontSize: fontSize.clase }]}>
                {clase.nombre}
              </Text>
              <View style={styles.disponibilidadBadge}>
                <Text style={styles.disponibilidadTexto}>
                  {clase.disponibles}/{clase.capacidad} disponibles
                </Text>
              </View>
            </View>
            
            <View style={styles.claseDetalles}>
              <View style={styles.detalleRow}>
                <Clock size={deviceType === 'tv' ? 24 : 16} color="#4A5568" />
                <Text style={[styles.claseDetalle, { fontSize: fontSize.detalle }]}>
                  {clase.horario}
                </Text>
              </View>
              <View style={styles.detalleRow}>
                <User size={deviceType === 'tv' ? 24 : 16} color="#4A5568" />
                <Text style={[styles.claseDetalle, { fontSize: fontSize.detalle }]}>
                  {clase.instructor}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={[
                styles.reservarButton,
                clase.disponibles === 0 && styles.botonDeshabilitado
              ]}
              onPress={() => realizarReservacion(clase)}
              disabled={clase.disponibles === 0}
            >
              <Text style={[
                styles.reservarTexto,
                { fontSize: fontSize.boton }
              ]}>
                {clase.disponibles > 0 ? 'Reservar Clase' : 'Clase Llena'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      {misReservaciones.length > 0 && (
        <>
          <Text style={[styles.subtitulo, { fontSize: fontSize.subtitulo, marginTop: 20 }]}>
            Mis Reservaciones
          </Text>
          
          <ScrollView style={styles.reservacionesContainer}>
            {misReservaciones.map((reservacion) => (
              <View key={reservacion.id} style={styles.reservacionCard}>
                <View style={styles.reservacionHeader}>
                  <Text style={[styles.reservacionNombre, { fontSize: fontSize.clase }]}>
                    {reservacion.nombre}
                  </Text>
                  <CheckCircle size={deviceType === 'tv' ? 28 : 20} color="#48BB78" />
                </View>
                
                <View style={styles.reservacionDetalles}>
                  <Text style={[styles.reservacionDetalle, { fontSize: fontSize.detalle }]}>
                    <Text style={styles.reservacionDetalleLabel}>Fecha: </Text>
                    {formatearFecha(reservacion.fecha)}
                  </Text>
                  <Text style={[styles.reservacionDetalle, { fontSize: fontSize.detalle }]}>
                    <Text style={styles.reservacionDetalleLabel}>Horario: </Text>
                    {reservacion.horario}
                  </Text>
                  <Text style={[styles.reservacionDetalle, { fontSize: fontSize.detalle }]}>
                    <Text style={styles.reservacionDetalleLabel}>Instructor: </Text>
                    {reservacion.instructor}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={styles.cancelarButton}
                  onPress={() => cancelarReservacion(reservacion.id)}
                >
                  <Text style={[
                    styles.cancelarTexto,
                    { fontSize: fontSize.boton }
                  ]}>
                    Cancelar Reservación
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      )}
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
  subtitulo: {
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 12,
  },
  fechasContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  fechaButton: {
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
  fechaSeleccionada: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  fechaTexto: {
    fontWeight: '500',
    color: '#4A5568',
    marginLeft: 8,
  },
  fechaTextoSeleccionada: {
    color: '#FFFFFF',
  },
  clasesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  claseCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  disponibilidadBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#EDF2F7',
  },
  disponibilidadTexto: {
    color: '#4A5568',
    fontSize: 12,
    fontWeight: '500',
  },
  claseDetalles: {
    marginBottom: 12,
  },
  detalleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  claseDetalle: {
    color: '#4A5568',
    marginLeft: 8,
  },
  reservarButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    backgroundColor: '#CBD5E0',
  },
  reservarTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  reservacionesContainer: {
    flex: 1,
  },
  reservacionCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#48BB78',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reservacionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reservacionNombre: {
    fontWeight: 'bold',
    color: '#171717',
    flex: 1,
  },
  reservacionDetalles: {
    marginBottom: 12,
  },
  reservacionDetalle: {
    color: '#4A5568',
    marginBottom: 4,
  },
  reservacionDetalleLabel: {
    fontWeight: '500',
  },
  cancelarButton: {
    backgroundColor: '#F56565',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelarTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Estilos para wearables
  fechasContainerWearable: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  fechaButtonWearable: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  fechaSeleccionadaWearable: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  fechaTextoWearable: {
    fontWeight: '500',
    color: '#4A5568',
    fontSize: 10,
  },
  fechaTextoSeleccionadaWearable: {
    color: '#FFFFFF',
  },
  claseCardWearable: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  claseNombreWearable: {
    fontWeight: 'bold',
    color: '#171717',
  },
  claseDetalleWearable: {
    color: '#4A5568',
    marginBottom: 4,
  },
  reservarButtonWearable: {
    backgroundColor: '#E53E3E',
    borderRadius: 4,
    paddingVertical: 4,
    alignItems: 'center',
  },
  botonDeshabilitadoWearable: {
    backgroundColor: '#CBD5E0',
  },
  reservarTextoWearable: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 10,
  },
});