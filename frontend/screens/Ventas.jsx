import { StyleSheet, Text, View } from 'react-native';

export default function VentasScreen(){
    return(
        <View style={styles.container}>
            <Text>
                Ventas
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });