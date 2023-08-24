import axios from "axios";
import { UseAppContext } from "../../../../context";
import React, {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'

const UpdateDetail = () => {
    // const { state, dispatch } = UseAppContext();
    // const { user } = state.authentication;

    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const handleOnSubmit = async () => {
    //     try {
    //       const dataStage = new URLSearchParams();
    //       dataStage.append("url", 'http://10.21.29.200:8069');
    //       dataStage.append("db", 'XRP2023DEV');
    //       dataStage.append("username", user.email);
    //       dataStage.append("password", user.password);
    //       dataStage.append("model", 'helpdesk.ticket');
    //       dataStage.append("id", user.id);
    //       dataStage.append("field[user_id]", user.id);
    
          
    
    //       const response = await axios.put(
    //         'http://mid.tachyon.net.id/api/update',
    //         dataStage.toString(),
    //         {
    //           headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //           },
    //         }
    //       );
    
    //       console.log('UPDATE STATUS :', response.data);
    //       await refresh();
    //       setIsModalVisible(false);
    
    //     } catch (err) {
    //       console.log('ERROR SEND', JSON.stringify(err, null, 4));
    //       alert('update gagal, coba lagi nanti');
    //     }
    //   };
    
    //   const toggleModal = () => {
    //     setIsModalVisible(!isModalVisible);
    //   };
    return (
        <>
            <View style={styles.container}>
            <Text style={styles.title}>Form Update</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, {marginEnd: 2}]}
                    placeholder="New Team"
                    textAlignVertical="top"
                    // value={newTeam}
                    // onChangeText={text => setNewTeam(text)}
                />
                <TextInput
                    style={[styles.input, {marginStart: 2}]}
                    placeholder="New User"
                    textAlignVertical="top"
                    // value={newTeam}
                    // onChangeText={text => setNewTeam(text)}
                />
            </View>
            <View style={styles.inputContainer}>
            <TextInput
                    style={[styles.inputDesc, {height: 100,}]}
                    placeholder="Description"
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                    // value={newTeam}
                    // onChangeText={text => setNewTeam(text)}
                />
            </View>
            <View style={styles.inputContainer}>
            <TextInput
                    style={[styles.inputDesc, {height: 60,}]}
                    placeholder="Resolution"
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                    // value={newTeam}
                    // onChangeText={text => setNewTeam(text)}
                />
            </View>
            <View style={styles.inputContainer}>
            <TextInput
                    style={[styles.inputDesc, {height: 60,}]}
                    placeholder="Awaiting reason"
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                />
            </View>
            <TouchableOpacity style={{
                backgroundColor: 'blue',
                width: '80%',
                paddingVertical: 8,
                borderRadius: 6
            }}>
                <Text style={{
                    color: 'white',
                    textAlign: "center"
                }}>
                    submit
                </Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '50%',
    },
    inputDesc: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        flex: 1,
    },
});

export default UpdateDetail