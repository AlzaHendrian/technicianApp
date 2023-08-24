import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import LoadingAnimation from '../../component/Loading';
import { UseAppContext } from '../../context';

// import { FilterTicketContext } from "../global/filterTicket";

const TeamList = () => {
  const navigation = useNavigation();
  const {state, dispatch} = UseAppContext();
  const {user} = state.authentication;
  const [searchTeam, setSearchTeam] = useState('');
  const [dataTicket, setDataTicket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTeamClick = teamName => {
    navigation.navigate('Ticket', {teamName}); 
    console.log("INI TEAM NAME CARD TICKET :", teamName)
  };

  useEffect(() => {
    const getDataTeam = async () => {
      const userDataTeam = user;
      
      const dataTeam = new URLSearchParams();
      dataTeam.append('model', 'helpdesk.ticket.team');
      dataTeam.append('fields[]', 'name');
      dataTeam.append('fields[]', 'id');
      dataTeam.append('fields[]', 'ticket_ids');
      dataTeam.append('url', 'http://10.21.29.200:8069');
      dataTeam.append('db', 'XRP2023DEV');
      dataTeam.append('username', userDataTeam.email);
      dataTeam.append('password', userDataTeam.password);
      try {

        const response = await axios.post(
          `http://mid.tachyon.net.id/api/read`,
          dataTeam.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );

        setDataTicket(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.log('INI ERROR', error.message);
      } finally {
        setIsLoading(false); // Set loading state to false once done
      }
    };

    getDataTeam();
    return () => setDataTicket([])
  }, []);


  function searchFilter(items, query) {
    const filteredItems = [];
    for (const item of items) {
      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        filteredItems.push(item);
      }
    }
    return filteredItems;
  }

  const _renderItem = ({item: teamName}) => {
    return (
      <TouchableOpacity
        onPress={() => handleTeamClick(teamName.name)}
        style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.teamName}>{teamName.name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoValue}>{teamName.ticket_ids.length}</Text>
              <Text style={styles.infoLabel}>Total Ticket</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>Unassigned</Text>
              <Text>Unattended</Text>
              <Text>High Priority</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>12</Text>
              <Text>12</Text>
              <Text>0</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="type search ..."
        value={searchTeam}
        onChangeText={text => setSearchTeam(text)}
        style={{
          padding: 8,
          backgroundColor: 'white',
          borderRadius: 25,
          marginBottom: 25,
          fontSize: 16,
          paddingHorizontal: 20,
          width: '95%',
        }}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>        
      {resultSearchTeam.map((teamName, index) => (
          <TouchableOpacity onPress={() => handleTeamClick(teamName.name)} key={index} style={styles.containerBody}>
            <View style={styles.innerContainer}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>{teamName.name}</Text>
                <View style={[styles.textContainer, { marginTop: 8 }]}>
                  <View style={styles.containerToDo}>
                    <Text style={styles.textToDo}>{teamName.ticket_ids.length}</Text>
                    <Text style={styles.textToDo}>Total Ticket</Text>
                  </View>
                  <View style={{marginLeft: '25%'}}>
                    <Text>Unassigned</Text>
                    <Text>Unattended</Text>
                    <Text>High Priority</Text>
                  </View>
                  <View style={{marginLeft: '20%'}}>
                    <Text>12</Text>
                    <Text>12</Text>
                    <Text>0</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
      ))}
      </ScrollView> */}
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <FlatList
          data={searchFilter(dataTicket, searchTeam)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={_renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  teamName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoValue: {
    fontWeight: 'bold',
  },
  infoLabel: {
    marginTop: 5,
  },
});

export default TeamList;
