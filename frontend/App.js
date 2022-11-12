import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { setStatusBarHidden } from 'expo-status-bar';

export default function App(){
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [sid, setSid] = useState('');
/*
  const getUsers = async () => {
     try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
*/

const saveCliente = async () => {
  if (!nombre.trim() || !apellidos.trim()) {
    alert("Name and last are required.");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(`http://172.16.61.242:3000/api/clientes`, {
      nombre,
      apellidos,
    });
    alert("Cliente creado correctamente.")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const updateCliente = async (id) => {
  if (!nombre.trim() || !apellidos.trim()) {
    alert("Name and last are required.");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.put(`http://172.16.61.242:3000/api/clientes/${id}`, {
      nombre,
      apellidos,
    });
    alert("Cliente modificado correctamente.")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const deleteCliente = async (id) => {
  setLoading(true);
  try {
    if(confirm("¿Está seguro de eliminar el cliente?")){
      const response = await axios.delete(`http://172.16.61.242:3000/api/clientes/${id}`);
      alert("Cliente eliminado correctamente.")
    }
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const getClientes = async () => {
  setLoading(true);
  try{
    const response = await axios.get(`http://172.16.61.242:3000/api/clientes`);
    setData(response.data)
  }
  catch(error){
    console.log(error)
  }
  finally{
    setLoading(false)
  }
};

const getClientePorId = async (id) => {
  setLoading(true);
  try{
    const response = await axios.get(`http://172.16.61.242:3000/api/clientes/${id}`);
    setData(response.data)
    setNombre(response.data.nombre)
    setApellidos(response.data.apellidos)
  }
  catch(error){
    console.log(error)
  }
  finally{
    setLoading(false)
  }
};

  useEffect(() => {
    //getUsers();
    getClientes();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'blue'}]}
        onPress={saveCliente}
      >
        <Text style={{color:'yellow'}}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'orange'}]}
        onPress={()=>updateCliente(sid)}
      >
        <Text style={{color:'yellow'}}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'red'}]}
        onPress={()=>deleteCliente(sid)}
      >
        <Text style={{color:'yellow'}}>Eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'#1ABC9C'}]}
        onPress={getClientes}
      >
        <Text style={{color:'yellow'}}>Buscar Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'green'}]}
        onPress={()=>getClientePorId(sid)}
      >
        <Text style={{color:'yellow'}}>Buscar por ID</Text>
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder='Ingrese ID a buscar'
          style={styles.inputs}
          onChangeText={sid => setSid(sid)}
          value={sid}
        />
        <TextInput
          placeholder='Ingrese nombre a buscar'
          style={styles.inputs}
          onChangeText={nombre => setNombre(nombre)}
          value={nombre}
        />
        <TextInput
          placeholder='Ingrese apellidos a buscar'
          style={styles.inputs}
          onChangeText={apellidos => setApellidos(apellidos)}
          value={apellidos}
        />
      </View>
      {isLoading ? <ActivityIndicator size='large' color='black' /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.buttons, {backgroundColor: item.id % 2 == 1 ? 'orange' : 'red'}]}
              onPress={()=>{
                if(confirm(`¿Está seguro de eliminar el usuario ${item.nombre} ${item.apellidos}?`)){
                  alert("Eliminado.")
                }
              }}
            >
              <Text>{item.nombre} {item.apellidos}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3333',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    borderRadius:10,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    height:40,
    marginBottom:5,
  },
  inputs: {
    borderWidth:2,
    borderColor:'green',
    borderRadius:10,
    marginBottom:5,
    textAlign:'center',
    padding:5
  }
});