import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, useWindowDimensions, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import AddMessage from './AddMessage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const MessageScreen = ({ route }) => {
    const {detailID} = route.params;
    const windowWidth = useWindowDimensions().width;
    const [messageList, setMessageList] = useState([]);
    // console.log("INI DATA TO MESSAGE :", detailID);

    const navigation = useNavigation()

    const getMessage = async () => {
        const dataRequestMessage = new URLSearchParams();
        dataRequestMessage.append('model', 'helpdesk.ticket');
        dataRequestMessage.append('record_id', detailID);
        dataRequestMessage.append('url', 'http://10.21.29.200:8069');
        dataRequestMessage.append('db', 'XRP2023DEV');
        dataRequestMessage.append('username', 'operationaluser@remala.id');
        dataRequestMessage.append('password', 'abc12345');
        // console.log("ini detailID di Message :", detailID)

        axios.post(`http://mid.tachyon.net.id/api/read/message`, dataRequestMessage.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.data.a_message === 'success') {
                const zMessageList = response.data.data.z_message_list;
                setMessageList(zMessageList);
            }
        }).catch(error => {
            console.log("INI ERROR", JSON.stringify(error, null, 4));
        });
    }

    const refreshData = async () => {
        await getMessage();
    }
    
    useEffect(() => {
        console.log("message datas request");
        refreshData();
    }, [detailID]);
    
    return (
        <KeyboardAwareScrollView>
            <SafeAreaView>
            {messageList.slice().reverse().map((message, index) =>  (
                    <View key={index} style={styles.messageContainer}>
                        <Text style={styles.authorText}>{message.author[1]}</Text>
                        <Text style={styles.dateText}>{message.date}</Text>
                        <View style={{ marginEnd: 100 }}>
                            <RenderHtml source={{ html: message.message }} contentWidth={windowWidth} />
                        </View>
                    </View>
                ))}
            </SafeAreaView>
            <View>
                <AddMessage messageID={detailID} refresh={refreshData}/>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    authorText: {
        fontWeight: 'bold',
    },
    dateText: {
        fontStyle: 'italic',
    },
    emailText: {
        color: 'blue',
    },
});

export default MessageScreen;
