import TeamList from "./TeamList";


const DashboardScreen = () => {
  return (
    <>
    {/* tickets list */}
    {/* <View style={styles.containerTitle}>
        <Text style={styles.title}>DASHBOARD</Text>
        <View style={styles.textContainer}>
            <Text>Tickets</Text>
            <Text>Tickets List</Text>
        </View>
    </View> */}
    {/* Card Ticket */}
    <TeamList/>
    {/* End Card Ticket */}
    </>
  );
}

export default DashboardScreen;
