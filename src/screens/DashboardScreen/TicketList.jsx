import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {UseAppContext} from '../../context';
import LoadingAnimation from '../../component/Loading';

const TicketList = ({route}) => {
  const {teamName} = route.params;
  const {state, dispatch} = UseAppContext();
  const {user} = state.authentication;
  const [dataListTicket, setDataListTicket] = useState([]);
  const [search, setSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const getDataListTicket = async () => {
        const userData = user;
        // console.log('12344234', JSON.stringify(userData, null, 2));
  
        const dataTicketByName = new URLSearchParams();
        dataTicketByName.append('model', 'helpdesk.ticket');
        dataTicketByName.append('fields[]', 'number');
        dataTicketByName.append('fields[]', 'stage_id');
        dataTicketByName.append('fields[]', 'team_id');
        dataTicketByName.append('fields[]', 'name');
        dataTicketByName.append('fields[]', 'id');
        dataTicketByName.append('domain[team_id.name]', teamName);
        dataTicketByName.append('url', 'http://10.21.29.200:8069');
        dataTicketByName.append('db', 'XRP2023DEV');
        dataTicketByName.append('username', userData.email);
        dataTicketByName.append('password', userData.password);
        // console.log(dataTicketByName.toString());
        // console.log("ini TEAM NAME DI TICKET LIST :", teamName)
        // console.log("ini DATA TICKET BY NAME :", dataTicketByName)
        try {
          // console.log('123')
          const response = await axios.post(
            `http://mid.tachyon.net.id/api/read`,
            dataTicketByName.toString(),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );
          // console.log("RESPONSE ", response)
  
          setDataListTicket(response.data.data);
          // console.log("ini ticket LIST TICKET :", response.data.data)
        } catch (error) {
          console.log('INI ERROR LIST TICKET', JSON.stringify(error, null, 4));
        } finally {
          setIsLoading(false); // Set loading state to false once done
        }
      };
  
      getDataListTicket();
      return () => setDataListTicket([]);
    }, [])
  )

  const handleDetailTicketTeam = ticketId => {
    navigation.navigate('Detail Bar', {ticketId});
  };

  function searchFilterListTicket(items, query) {
    const filteredItems = [];
    for (const item of items) {
      if (item.number.toLowerCase().includes(query.toLowerCase())) {
        filteredItems.push(item);
      }
    }
    return filteredItems;
  }

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <View style={styles.container}>
          <TextInput
            placeholder="Type search ..."
            value={search}
            onChangeText={text => setSearch(text)}
            style={styles.searchInput}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {dataListTicket.length > 0 ? (
              searchFilterListTicket(dataListTicket, search).map(
                (ticketId, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDetailTicketTeam(ticketId.id)}
                    style={styles.ticketContainer}>
                    <Text style={styles.ticketNumber}>{ticketId.number}</Text>
                    <Text style={styles.ticketStatus}>
                      Status: {ticketId.stage_id[1]}
                    </Text>
                  </TouchableOpacity>
                ),
              )
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>Data tidak ditemukan</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F6FA70',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  ticketContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  ticketNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ticketStatus: {
    color: '#333',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default TicketList;
