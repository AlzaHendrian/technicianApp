import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import HandleStatus from './HandleStatus';
import {UseAppContext} from '../../../context';
import {addTeknisi} from '../../../context/reducer/teknisiReducer';
import {addTeknisiAction} from '../../../context/action/teknisi';
import TombolUpdate from './Component/TombolUpdate';
import AssignToMe from './Component/TombolAsyncToMe';

const DetailTicket = ({ticketId}) => {
  // const { width } = useWindowDimensions();
  const {state, dispatch} = UseAppContext();
  const {user} = state.authentication
  const windowWidth = useWindowDimensions().width;
  // const {ticketId} = route.params;
  const [dataDetail, setDataDetail] = useState([]);
  const [stageID, setStageID] = useState([]);
  const navigation = useNavigation();

  const handleToMessage = detailID => {
    navigation.navigate('Message', {detailID: dataDetail.id});
  };

  const getDataDetailTicket = async () => {
    const dataTicketByDetail = new URLSearchParams();
    dataTicketByDetail.append('model', 'helpdesk.ticket');
    dataTicketByDetail.append('fields[]', 'number');
    dataTicketByDetail.append('fields[]', 'response_time');
    dataTicketByDetail.append('fields[]', 'MTTR_time');
    dataTicketByDetail.append('fields[]', 'assigned_date');
    dataTicketByDetail.append('fields[]', 'stage_id');
    dataTicketByDetail.append('fields[]', 'team_id');
    dataTicketByDetail.append('fields[]', 'name');
    dataTicketByDetail.append('fields[]', 'id');
    dataTicketByDetail.append('fields[]', 'location_coordinate');
    dataTicketByDetail.append('fields[]', 'user_id');
    dataTicketByDetail.append('fields[]', 'create_date');
    dataTicketByDetail.append('fields[]', 'response_display');
    dataTicketByDetail.append('fields[]', 'resolution');
    dataTicketByDetail.append('fields[]', 'awaiting_reason');
    dataTicketByDetail.append('fields[]', 'description');
    dataTicketByDetail.append('fields[]', 'response_state');
    dataTicketByDetail.append('domain[id]', parseInt(ticketId));
    dataTicketByDetail.append('url', 'http://10.21.29.200:8069');
    dataTicketByDetail.append('db', 'XRP2023DEV');
    dataTicketByDetail.append('username', user.email);
    dataTicketByDetail.append('password', user.password);
    dataTicketByDetail.append('relation[technician_ids]', 'hr.employee');
    dataTicketByDetail.append('fields[]', 'technician_ids');
    // dataTicketByDetail.append('domain[id]', '1096');
    // console.log("ini DOMAIN DETAIL TICKET :", ticketId)
    // console.log("INI STAGE_ID :", stage_id)
    console.log("ID detail ticket :", ticketId);
    try {
      const response = await axios.post(
        `http://mid.tachyon.net.id/api/read`,
        dataTicketByDetail.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      //   console.log('10000')
      const technician_ids = response.data.data[0].technician_ids;
      dispatch(addTeknisiAction(technician_ids));
      setDataDetail(response.data.data[0]);
      setStageID(response.data.data[0].stage_id);
      setUserID(response.data.data[0].user_id);
    } catch (error) {
      console.log('INI ERROR', JSON.stringify(error, null, 4));
    }
  };

  useEffect(() => {
    // console.log("150000")
    getDataDetailTicket();
  }, []);

  //   console.log("INI DATA DESCRIPTION DI DALAM DETAIL ID :", htmlContent);
  return (
    <>
    {!dataDetail.user_id ? (
      <View style={{ alignItems: 'center', marginVertical: 10}}>
        <AssignToMe detailID={dataDetail.id}/>
      </View>
    ) : (
      null
    )}

      <ScrollView style={{flex: 1}}>
        <View style={[{paddingVertical: 20}, styles.containerBackground]}>
          <Text style={styles.textTitle}>{dataDetail.number}</Text>
          <Text
            style={{
              paddingHorizontal: 12,
              fontSize: 16,
              fontWeight: 500,
              marginTop: 20,
              marginEnd: 50,
            }}>
            {dataDetail.name}
          </Text>
        </View>
        <View style={styles.containerBackground}>
          <Text
            style={{
              paddingHorizontal: 12,
              fontSize: 16,
              fontWeight: 500,
              marginTop: 5,
              marginEnd: 50,
            }}>
            response time : {dataDetail.response_time}
          </Text>
          <Text style={{
              paddingHorizontal: 12,
              fontSize: 16,
              fontWeight: 500,
              marginEnd: 50,
            }}>MTTR time : {dataDetail.MTTR_time}</Text>
        </View>

        <View style={styles.containerContent}>
          <View
            style={[
              {
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginTop: 'auto',
                alignSelf: 'stretch',
              },
              styles.containerBackground,
            ]}>
            <View style={[styles.gridTeam]}>
              <Text style={styles.textContent}>Team </Text>
              <Text style={{color: '#454545', fontWeight: 300, fontSize: 18}}>
                {dataDetail.team_id && dataDetail.team_id[1]}
              </Text>
            </View>

            <View style={[styles.gridTeam]}>
              <Text style={styles.textContent}>User </Text>
              <Text style={{color: '#454545', fontWeight: 300, fontSize: 18}}>
                {dataDetail.user_id && dataDetail.user_id[1]}
              </Text>
            </View>

            <View style={[styles.gridTeam]}>
              <Text style={styles.textContent}>Location </Text>
              <Text style={{color: '#454545', fontWeight: 300, fontSize: 18}}>
                {dataDetail.location_coordinate &&
                  dataDetail.location_coordinate}
              </Text>
            </View>

            <View style={[styles.gridTeam]}>
              <Text style={styles.textContent}>Create On </Text>
              <Text style={{color: '#454545', fontWeight: 300, fontSize: 18}}>
                {dataDetail.create_date && dataDetail.create_date}
              </Text>
            </View>

            <Text style={styles.textContent}>Assigned date : {dataDetail.assigned_date}</Text>
            <View style={[styles.gridTeam, {alignItems: 'center'}]}>
              <Text style={styles.textContent}>Status </Text>
              {stageID[1] === 'Done' ? (
                <Text
                  style={{
                    backgroundColor: '#A2FF86',
                    color: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  done
                </Text>
              ) : stageID[1] === 'New' ? (
                <Text
                  style={{
                    backgroundColor: '#A2FF86',
                    color: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  new
                </Text>
              ) : stageID[1] === 'Awaiting' ? (
                <Text
                  style={{
                    backgroundColor: '#F1F0E8',
                    color: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  Awaiting
                </Text>
              ) : stageID[1] === 'Resolved' ? (
                <Text
                  style={{
                    backgroundColor: '#F1F0E8',
                    color: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  resolved
                </Text>
              ) : stageID[1] === 'In Progress' ? (
                <Text
                  style={{
                    backgroundColor: '#9E9FA5',
                    color: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  in progress
                </Text>
              ) : stageID[1] === 'Rejected' ? (
                <Text
                  style={{
                    backgroundColor: '#9E9FA5',
                    color: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  Rejected
                </Text>
              ) : (
                <Text
                  style={{
                    backgroundColor: '#FE0000',
                    color: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  cancelled
                </Text>
              )}
              {/* <Text style={{backgroundColor: '#A2FF86', paddingHorizontal: 20, paddingVertical: 2}}>{stageID[1]}</Text> */}
              {dataDetail.user_id ? (
                <HandleStatus
                  id={dataDetail.id}
                  stageID={stageID[0]}
                  refresh={getDataDetailTicket}
                />
              ) : (
                null
              )}
            </View>
            <View>
              <Text style={styles.textContent}>Description </Text>
              <RenderHtml
                source={{html: dataDetail.description}}
                contentWidth={windowWidth}
              />
            </View>
            <View>
              <Text style={styles.textContent}>Resolution </Text>
              <RenderHtml
                source={{html: dataDetail.resolution}}
                contentWidth={windowWidth}
              />
            </View>
            <View>
              <Text style={styles.textContent}>Awaiting reason </Text>
              <RenderHtml
                source={{html: dataDetail.awaiting_reason}}
                contentWidth={windowWidth}
              />
            </View>

          </View>
        </View>
      </ScrollView>
      <View style={styles.floatingIconContainer}>
        <TouchableOpacity onPress={() => handleToMessage(dataDetail.id)}>
          <Icon name="message" size={40} color="#900" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    marginTop: 5,
    height: '100%',
    flexWrap: 'wrap',
    flex: 1,
  },
  textTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: '#454545',
  },
  textContent: {
    fontSize: 18,
    fontWeight: 'bold',
    marginEnd: 16,
  },
  gridTeam: {
    flexDirection: 'row',
  },
  containerBackground: {
    backgroundColor: '#F6FA70',
    borderRadius: 5,
    elevation: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  floatingIconContainer: {
    position: 'absolute',
    bottom: 1, // Sesuaikan posisi vertikal ikon sesuai keinginan Anda
    right: 20, // Sesuaikan posisi horizontal ikon sesuai keinginan Anda
    zIndex: 999, // Nilai z-index yang besar agar ikon berada di atas konten lainnya
  },
});

export default DetailTicket;
