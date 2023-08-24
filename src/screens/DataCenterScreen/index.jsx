import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import React, {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView} from 'react-native'
import { UseAppContext } from '../../context';
import { useEffect, useState } from 'react';
const DataCenter = () => {
    const {state, dispatch} = UseAppContext();
    const {user} = state.authentication;
    const [listDataCenter, setListDataCenter] = useState([]);
    const navigation = useNavigation();
    
    // const handleToVisit = () => {
    //     navigation.navigate('Visit')
    // }
    const getListDataCenter = async () => {
        // console.log('CLICKET Data Center');
        const dataCenter = new URLSearchParams();
        dataCenter.append('url', 'http://10.21.29.200:8069')
        dataCenter.append('db', 'XRP2023DEV')
        dataCenter.append('limit', '10')
        dataCenter.append('model', 'itm.site')
        // dataCenter.append('fields[]', 'display_name')
        dataCenter.append('username', user.email)
        dataCenter.append('password', user.password)



        try {
            console.log('Clicket Data Center 2');
            const response = await axios.post('http://mid.tachyon.net.id/api/read', dataCenter.toString(), {
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
            })
            console.log("CLICKET DATA CENTER 3");

            setListDataCenter(response.data.data)
            console.log(response.data.data.display_name)
        } catch (error) {
            console.log('Network Error Details:', error.message);
        }

    } 

    useEffect(() => {
        // console.log("150000")
        getListDataCenter();
      }, []);


    // const renderItem = ({ item }) => (
    //     <View>
    //       <Text>{item.display_name}</Text>
    //     </View>
    //   );


    return (
        <>
            <View style={{
                flexDirection: 'row', 
                justifyContent: 'center',
                marginTop: 80
                }}
                >
                <TouchableOpacity onPress={() => navigation.navigate('Visitor')}>
                    <View style={{
                        backgroundColor: 'blue', 
                        padding: 12, 
                        width: 180, 
                        marginEnd: 6,
                        borderRadius: 4
                        }}
                        >
                        <Text style={{
                            color: 'white', 
                            textAlign: 'center', 
                            fontSize: 20
                            }}
                            >
                                Visitor
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Visit')}>
                    <View style={{
                        backgroundColor: 'blue', 
                        padding: 12, 
                        width: 180, 
                        marginStart: 6,
                        borderRadius: 4
                        }}
                        >
                        <Text style={{
                            color: 'white', 
                            textAlign: 'center', 
                            fontSize: 20
                            }}
                            >
                                Visit
                            </Text>
                    </View>
                </TouchableOpacity>


            </View>
            <View>
            
            <ScrollView>
                {listDataCenter.map((item, idx) => (
                    <View key={idx} style={styles.cardContainer}>
                        <Text style={styles.cardText}>{item.display_name}</Text>
                    </View>
                ))}
            </ScrollView>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      elevation: 4, 
      shadowColor: '#000', 
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
    },
    cardText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default DataCenter