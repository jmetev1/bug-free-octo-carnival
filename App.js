import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const Venues = ({ array }) => {
  return (
    <View>
      <Text>Venues</Text>
      {array.map((venue) => (
        <Text key={venue.id}>{venue.name}</Text>
      ))}
    </View>
  );
};

const Events = ({ array }) => {
  return (
    <View>
      <Text>Events</Text>
      {array.map(({ event }) => {
        const { datetime_local, id, name } = event;
        return (
          <View key={id}>
            <Text>{datetime_local}</Text>
            <Text>{name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const Performers = ({ array }) => {
  return (
    <View>
      <Text>Performers</Text>
      {array.map((p) => {
        const { id, name, category, hero_image_url } = p;
        return (
          <View key={id}>
            <Text>{name}</Text>
            <Text>{category}</Text>
            <Image
              source={{ uri: hero_image_url }}
              style={{ width: 200, height: 200 }}
            ></Image>
          </View>
        );
      })}
    </View>
  );
};

export default function App() {
  const [input, setInput] = useState("");
  const [events, setEvents] = useState([]);
  const [performers, setPerformers] = useState([]);
  const [venues, setVenues] = useState([]);

  const updateResults = async (query) => {
    setInput(query);
    const newResults = await fetch(
      `https://mobile-staging.gametime.co/v1/search?q=${query}`
    );
    const real = await newResults.json();
    const { events, performers, venues } = real;
    setEvents(events.slice(0, 3));
    setPerformers(performers.slice(0, 3));
    setVenues(venues.slice(0, 3));
  };

  return (
    <View style={styles.container}>
      <TextInput 
        onChangeText={updateResults} 
        value={input}
        placeholder="search here"
      />
      <Events array={events}></Events>
      <Performers array={performers}></Performers>
      <Venues array={venues}></Venues>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
