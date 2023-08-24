import { UseAppContext } from "../../../context";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const DetailTeknisi = () => {
    const { state, dispatch } = UseAppContext();
    const { teknisi } = state.teknisi;

    console.log("dataTeknisi context", teknisi);

    const renderItem = ({ item }) => (
        <View style={[styles.card, {marginHorizontal: 16}]}>
            <Text>Nama teknisi</Text>
            <Text style={styles.displayName}>{item.display_name}</Text>
        </View>
    );

    return (
        <>
        <Text style={{fontSize: 20, fontWeight: '500', marginTop: 28, textAlign: 'center', marginBottom: 5}}>DAFTAR TEKNISI</Text>
        <FlatList
            data={teknisi}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginVertical: 6,
        padding: 12,
        borderRadius: 8,
        elevation: 4, // Adding shadow
    },
    displayName: {
        textAlign: 'right',
        marginTop: 4,
    },
});

export default DetailTeknisi;
