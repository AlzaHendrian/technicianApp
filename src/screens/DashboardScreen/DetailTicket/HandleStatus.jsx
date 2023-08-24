import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { UseAppContext } from '../../../context';

const HandleStatus = ({ id, stageID, navigation, refresh }) => {
  console.log("INI PROPS STAGE ID DI HANDLE STATUS :", stageID)
  const { state, dispatch } = UseAppContext();
  const { user } = state.authentication;
  // const stage_id = stageID[1];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const options = [
    {
      title:"In Progress",
      id:2
    },
  {
    title:"Awaiting",
    id:3
  },
  {
    title:"Resolved",
    id:7
  },
];

  console.log("INI DATA STATUS STAGEID :", stageID);

  const handleOnSubmit = async (newStageID) => {
    const dataUser = user
    try {
      const dataStage = new URLSearchParams();
      dataStage.append("url", 'http://10.21.29.200:8069');
      dataStage.append("db", 'XRP2023DEV');
      dataStage.append("username", dataUser.email);
      dataStage.append("password", dataUser.password);
      dataStage.append("model", 'helpdesk.ticket');
      dataStage.append("id", id);
      dataStage.append("field[stage_id]", newStageID);

      

      const response = await axios.put(
        'http://mid.tachyon.net.id/api/update',
        dataStage.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('UPDATE STATUS :', response.data);
      await refresh();
      setIsModalVisible(false);

    } catch (err) {
      console.log('ERROR SEND', JSON.stringify(err, null, 4));
      alert('update gagal, coba lagi nanti');
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.selectButton} onPress={toggleModal}>
        <Text style={styles.selectedValue}>{status.stageID}</Text>
      </TouchableOpacity> */}
      <Icon  name="edit" size={20} color="#900" onPress={toggleModal}/>

      <Modal visible={isModalVisible} animationType="slide" >
        <View style={styles.modalContainer}>
        <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleOnSubmit(item.id)}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: 150,
    alignItems: 'center',
  },
  selectedValue: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});

export default HandleStatus;
