import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DetailTicket from '../DetailTicket';
import Teknisi from '../../DetailTeknisi/Index';

const DetailBar = ({route}) => {
    const {ticketId} = route.params;
    const [selectTab, setSelectTab] = useState('ticket')
    return (
        <>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navItem} onPress={() => setSelectTab('ticket')}>
                    <Text style={styles.navText}>Ticket</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => setSelectTab("teknisi")}>
                    <Text style={styles.navText}>Teknisi</Text>
                </TouchableOpacity>

            </View>
            {selectTab === "ticket" ? <DetailTicket ticketId={ticketId} /> : null}
            {selectTab === "teknisi" ? <Teknisi /> : null}
        </>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
    },
    navItem: {
        padding: 10,
    },
    navText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DetailBar;
