import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';


// Headline funciona como un H1
//RNPAPER, maneja estilos como si fuera la web

const NuevoCliente = ({navigation, route}) => {
   
    const { guardarConsultarAPI } = route.params;

    //Campos Formulario

    const [ nombre, guardarNombre ] = useState('');
    const [ telefono, guardarTelefono ] = useState('');
    const [ correo, guardarCorreo ] = useState('');
    const [ empresa, guardarEmpresa ] = useState('');
    const [ alerta, guardarAlerta ] = useState(false);

    // Detectar si estamos editando o no
    useEffect(() => {
        if(route.params.cliente) {
            const { nombre, telefono, correo, empresa } = route.params.cliente;

            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo),
            guardarEmpresa(empresa);
        } 

    }, []);

    // Almacena el cliente en la base de dato
    const guardarCliente = async () => {

        //Validar
        if(nombre === '' || telefono === '' || correo === '' || empresa === '') {
            guardarAlerta(true)
            return;
        }

        // Generar el cliente
        const cliente = { nombre, telefono, empresa, correo };
        console.log(cliente);
        
        // Si estamos editando o creando un nuevo cliente
        if(route.params.cliente) {

            const { id } = route.params.cliente;
            cliente.id = id;
            const url = `http://192.168.0.241:3000/clientes/${id}`;
            
            try {
                await axios.put(url, cliente);
            } catch (error) {
                console.log(error);
            }

        } else {
            // Guardar el cliente en la API
            try {
                //para android
                //await axios.post('http://10.0.2.2:3000/clientes', cliente);
                //para ios
                await axios.post('http://192.168.0.241:3000/clientes', cliente);
                
            } catch(error) {
                console.log(error);
            }
        }

        // Redireccionar
        navigation.navigate('Inicio');

        // Limpiar el form (opcional)
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

        // Cambiar a true para traernos el nuevo cliente
        guardarConsultarAPI(true);
    }

    
    return (
       <View style={globalStyles.contenedor}>
           <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

           <TextInput
                label="Nombre"
                placeholder='Paula'
                onChangeText={ texto => guardarNombre(texto) }
                value={nombre}
                style={styles.input}
           />

            <TextInput
                label="Teléfono"
                placeholder="123456789"
                onChangeText={ texto => guardarTelefono(texto) }
                value={telefono}
                style={styles.input}
           />

            <TextInput
                label="Correo"
                placeholder="correo@correo.com"
                onChangeText={ texto => guardarCorreo(texto) }
                value={correo}
                style={styles.input}
           />

            <TextInput
                label="Empresa"
                placeholder="Nombre Empresa"
                onChangeText={ texto => guardarEmpresa(texto) }
                value={empresa}
                style={styles.input}
           />

           <Button icon="pencil-circle" mode="contained" onPress={() =>guardarCliente()}>
               Guardar Cliente
           </Button>

           <Portal>
               <Dialog
                    visible={alerta}
                    onDismiss={ () => guardarAlerta(false)}
                >
                   <Dialog.Title>Error;</Dialog.Title>
                   <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                   </Dialog.Content>
                   <Dialog.Actions>
                       <Button onPress={ () => guardarAlerta(false)}>OK</Button>
                   </Dialog.Actions>
               </Dialog>
           </Portal>

       </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente;