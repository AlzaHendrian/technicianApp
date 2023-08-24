import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {id: '1', title: 'Job Management', path: 'Dashboard', icon: 'team'},
  {id: '2', title: 'Data Center', path: 'Data Center', icon: 'pushpin'},
  {id: '3', title: 'Navigation', path: null, icon: 'enviroment'},
  {id: '4', title: 'Inventory', path: null, icon: 'circledown'},
  {id: '5', title: 'Customer Service', path: null, icon: 'aliwangwang-o1'},
  {id: '6', title: 'Updates/Tracking', path: null, icon: 'sharealt'},
];

const Menu = () => {
  const navigation = useNavigation();
  const handlePressMenu = path => {
    if (path === null) {
      return;
    }
    navigation.navigate(path);
  };

  const renderItem = ({item}) => (
    <>
      <TouchableOpacity onPress={() => handlePressMenu(item.path)}>
        <View
          style={{
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            width:120,
            height:120
          }}>
          <Icon name={item.icon} size={50} color='#78C1F3' />
          <Text style={{fontSize: 16, textAlign:'center'}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  transparentBox: {
    backgroundColor: 'rgba(245, 234, 39, 0.6)',
    padding: 2,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10, // Tambahkan margin horizontal
    marginRight: 10,
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
});

export default Menu;
