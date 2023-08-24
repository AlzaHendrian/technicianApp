import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { UseAppContext } from '../../context';

const AddMessage = ({messageID, refresh}) => {
  // const {messageID} = route.params;
  //   const [messages, setMessages] = useState([]);
  //   const [newMessage, setNewMessage] = useState('');
  const options = [
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Awaiting' },
    { id: 7, name: 'Resolved' }
  ];

  const [message, setMessage] = useState({
    url: 'http://10.21.29.200:8069',
    db: 'XRP2023DEV',
    username: 'operationaluser@remala.id',
    password: 'abc12345',
    model: 'helpdesk.ticket',
    record_id: messageID,
    send_message: '',
  });

  // console.log('ID MESSAGE NYA', messageID);

  // console.log('INI MESSAGE :', message);

  const handleOnChange = (name, value) => {
    setMessage({
      ...message,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    try {
      const messageData = new URLSearchParams();
      messageData.append('url', message.url);
      messageData.append('db', message.db);
      messageData.append('username', message.username);
      messageData.append('password', message.password);
      messageData.append('model', message.model);
      messageData.append('record_id', message.record_id);
      messageData.append('send_message', message.send_message);
      // console.log('hallo gais', messageData.toString());

      const response = await axios.post(
        'http://mid.tachyon.net.id/api/create/message',
        messageData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      // console.log('SEND MESSAGE', response);
      // Reset form after submission
      //   setMessage({
      //     url: 'http://172.16.35.34:8072',
      //     db: 'erpnew',
      //     username: 'admin',
      //     password: 'admin',
      //     model: 'helpdesk.ticket',
      //     record_id: '196',
      //     field: 'message',
      //     send_message: '',
      //   });
      await refresh();
    } catch (err) {
      console.log('ERROR SEND', err);
      alert('Failed to send message');
    }
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          multiline // Mengizinkan inputan multiple baris
          numberOfLines={3} // Menampilkan 3 baris awal
          value={message.send_message}
          onChangeText={value => handleOnChange('send_message', value)}
        />
        <TouchableOpacity
          onPress={handleOnSubmit}
          style={{
            backgroundColor: '#4E4FEB',
            paddingHorizontal: 12,
            borderRadius: 26,
          }}>
          <Text style={{color: 'white'}}>send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  messageContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    // paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
  },
  floatingIconContainer: {
    position: 'absolute',
    bottom: 1,
    right: 20,
    zIndex: 999,
  },
});

export default AddMessage;
