import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function VendedoresScreen({ route }) {

    const [isLoading, setLoading] = useState(true); //componente visual de carga, muestra una bolita cargando
    const [data, setData] = useState([]);
    const [nombre, setNombre] = useState("");
    const [correoe, setCorreo] = useState("");
    const [totalcomision, setTotalComision] = useState("");
    const [sid, setSid] = useState("");
    const ip = "http://192.168.1.13:3000";

  const saveVendedor = async () => {
    if (!nombre.trim() || !correoe.trim() || !totalcomision.trim()) {
      alert("Nombre, correo y comisión son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${ip}/api/vendedor`, {
        nombre,
        correoe,
        totalcomision,
      });
      alert("Vendedor creado correctamente.");
      setSid("");
      setNombre("");
      setCorreo("");
      setTotalComision("");
    } catch (error) {
      console.log(error);
    } finally {
      getVendedores();
      setLoading(false);
    }
  };

  const getVendedores = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ip}/api/vendedor`);
      setData(response.data);
      setSid("");
      setNombre("");
      setCorreo("");
      setTotalComision("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getVendedorPorId = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${ip}/api/vendedor/${id}`);
      setData(response.data);
      setNombre(response.data.nombre);
      setCorreo(response.data.correoe);
      setTotalComision(response.data.totalcomision);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //getUsers();
    getVendedores();
  }, []);

  return (

    <View style={{ flex: 1, padding: 24 }}>
      <View>
        <TextInput
          placeholder="Ingrese ID"
          style={styles.inputs}
          onChangeText={(sid) => setSid(sid)}
          value={sid}
        />
        <TextInput
          placeholder="Ingrese nombre"
          style={styles.inputs}
          onChangeText={(nombre) => setNombre(nombre)}
          value={nombre}
        />
        <TextInput
          placeholder="Ingrese correo"
          style={styles.inputs}
          onChangeText={(correoe) => setCorreo(correoe)}
          value={correoe}
        />
        <TextInput
          placeholder="Ingrese comisión"
          style={styles.inputs}
          onChangeText={(totalcomision) => setTotalComision(totalcomision)}
          value={totalcomision}
        />
        
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "#1ABC9C" }]}
          onPress={() => getVendedorPorId(sid)}
        >
          <Text style={{ color: "white" }}>Buscar por ID</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "#1ABC9C" }]}
          onPress={getVendedores}
        >
          <Text style={{ color: "white" }}>Buscar Vendedores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "#1ABC9C" }]}
          onPress={saveVendedor}
        >
          <Text style={{ color: "white" }}>Guardar</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.buttons,
                { backgroundColor: item.id % 2 == 1 ? "wheat" : "grey" },
              ]}
              onPress={() => {
                if (
                  confirm(
                    `¿Está seguro de eliminar el usuario ${item.nombre} ?`
                  )
                ) {
                  alert("Eliminado.");
                }
              }}
            >
              <Text>{item.nombre}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3333",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginBottom: 5,
  },
  inputs: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    marginBottom: 5,
    textAlign: "center",
    padding: 5,
  },
});
