import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  ScrollView,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Dumbbell, CalendarCheck, X,CalendarX } from 'lucide-react-native';


const CLASES_DISPONIBLES = [
  { id: 1, nombre: 'Yoga', horario: '10:00 AM', fecha: '2025-05-05', disponibles: 5 },
  { id: 2, nombre: 'Pilates', horario: '12:00 PM', fecha: '2025-05-05', disponibles: 0 },
  { id: 3, nombre: 'Spinning', horario: '2:00 PM', fecha: '2025-05-05', disponibles: 8 },
  { id: 4, nombre: 'Zumba', horario: '4:00 PM', fecha: '2025-05-06', disponibles: 2 },
  { id: 5, nombre: 'Boxeo', horario: '6:00 PM', fecha: '2025-05-06', disponibles: 7 },
];

const FECHAS = {
  HOY: '2025-05-05',
  MANANA: '2025-05-06',
};

const ReservacionesScreen = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(FECHAS.HOY);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [clasesReservadas, setClasesReservadas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const clasesFiltradas = CLASES_DISPONIBLES.filter(clase => clase.fecha === fechaSeleccionada);
    setClasesDisponibles(clasesFiltradas);
  }, [fechaSeleccionada]);

  const reservarClase = (clase) => {
    if (clase.disponibles > 0 && !clasesReservadas.some(r => r.id === clase.id)) {
      setClasesReservadas([...clasesReservadas, clase]);
      setClasesDisponibles(prev =>
        prev.map(c => c.id === clase.id ? { ...c, disponibles: c.disponibles - 1 } : c)
      );
    }
  };

  const cancelarReservacion = (claseId) => {
    const claseCancelada = clasesReservadas.find(c => c.id === claseId);
    setClasesReservadas(clasesReservadas.filter(c => c.id !== claseId));
    setClasesDisponibles(prev =>
      prev.map(c => c.id === claseId ? { ...c, disponibles: c.disponibles + 1 } : c)
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Reservaciones de Clases
        </Text>

        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          {Object.entries(FECHAS).map(([label, fecha]) => (
            <Pressable
              key={fecha}
              onPress={() => setFechaSeleccionada(fecha)}
              style={{
                backgroundColor: fechaSeleccionada === fecha ? '#10b981' : '#E5E7EB',
                padding: 10,
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <Text style={{ color: fechaSeleccionada === fecha ? 'white' : 'black' }}>
                {label === 'HOY' ? 'Hoy' : 'Mañana'}
              </Text>
            </Pressable>
          ))}
        </View>

        {clasesDisponibles.map(clase => {
          const reservada = clasesReservadas.some(r => r.id === clase.id);
          return (
            <View
              key={clase.id}
              style={{
                backgroundColor: clase.disponibles === 0 ? '#FEE2E2' : '#F7FAFC',
                padding: 12,
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#CBD5E0',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Dumbbell size={24} color="#4B5563" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{clase.nombre}</Text>
              </View>
              <Text style={{ marginTop: 4 }}>{clase.horario}</Text>
              <Text style={{ marginTop: 4 }}>
                Disponibles: {clase.disponibles === 0 ? 'Clase Llena' : clase.disponibles}
              </Text>
              <Pressable
                onPress={() => reservarClase(clase)}
                disabled={clase.disponibles === 0 || reservada}
                style={{
                  backgroundColor: clase.disponibles === 0 || reservada ? '#D1D5DB' : '#10B981',
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  {reservada ? 'Ya reservada' : 'Reservar'}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>

      {/* Botón flotante */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.fab}
      >
        <CalendarCheck size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal de clases reservadas */}
      {/* <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
            Tus Reservaciones
          </Text>
          {clasesReservadas.length === 0 ? (
            <Text>No tienes clases reservadas.</Text>
          ) : (
            clasesReservadas.map(clase => (
              <View
                key={clase.id}
                style={{
                  backgroundColor: '#E0F2FE',
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#10b981',
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{clase.nombre}</Text>
                <Text style={{ marginTop: 4 }}>{clase.horario}</Text>
                <Pressable
                  onPress={() => cancelarReservacion(clase.id)}
                  style={{
                    backgroundColor: '#EF4444',
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 8,
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>Cancelar</Text>
                </Pressable>
              </View>
            ))
          )}
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              marginTop: 16,
              backgroundColor: '#10b981',
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal> */}
      <Modal
  visible={modalVisible}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Tus Reservaciones</Text>
      <Pressable onPress={() => setModalVisible(false)}>
        <X size={24} color="#374151" />
      </Pressable>
    </View>

    {clasesReservadas.length === 0 ? (
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <CalendarX size={48} color="#9CA3AF" />
        <Text style={{ marginTop: 12, fontSize: 16, color: '#6B7280' }}>
          No tienes clases reservadas.
        </Text>
      </View>
    ) : (
      clasesReservadas.map(clase => (
        <View
          key={clase.id}
          style={{
            backgroundColor: '#E0F2FE',
            padding: 12,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#10b981',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <CalendarCheck size={18} color="#047857" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{clase.nombre}</Text>
          </View>
          <Text style={{ marginLeft: 24, color: '#374151' }}>{clase.horario}</Text>
          <Pressable
            onPress={() => cancelarReservacion(clase.id)}
            style={{
              backgroundColor: '#EF4444',
              padding: 10,
              borderRadius: 8,
              marginTop: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X size={16} color="#fff" style={{ marginRight: 6 }} />
            <Text style={{ color: 'white', textAlign: 'center' }}>Cancelar</Text>
          </Pressable>
        </View>
      ))
    )}

    <Pressable
      onPress={() => setModalVisible(false)}
      style={{
        marginTop: 16,
        backgroundColor: '#10b981',
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <X size={18} color="#fff" style={{ marginRight: 6 }} />
      <Text style={{ color: 'white', textAlign: 'center' }}>Cerrar</Text>
    </Pressable>
  </View>
</Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 50,
    elevation: 6,
  },
});

export default ReservacionesScreen;
