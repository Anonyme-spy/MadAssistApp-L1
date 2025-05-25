import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { View, Text } from '@/components/Themed';
import Search from "@/components/SearchBar";
import { ListAppel } from "@/components/list";
import { Tab, TabView } from '@rneui/themed';
import { baseThemedStyle } from "@/constants/baseThemedStyle";
import { useLocalSearchParams } from 'expo-router';

export default function TabTwoScreen() {
  const { tabIndex } = useLocalSearchParams();
  // Commence la valeur de l'index à partir du paramètre de navigation
  const [index, setIndex] = React.useState(() => {
    if (tabIndex) {
      const parsedIndex = parseInt(tabIndex as string, 10);
      return !isNaN(parsedIndex) ? parsedIndex : 0;
    }
    return 0;
  });

  // mise à jour de l'index si le paramètre de navigation change
  useEffect(() => {
    if (tabIndex) {
      const parsedIndex = parseInt(tabIndex as string, 10);
      if (!isNaN(parsedIndex)) {
        setIndex(parsedIndex);
      }
    }
  }, [tabIndex]);

  const contacts = [
    {
      title: "Service d'urgence médical",
      description: "Pour les urgences médicales et les ambulances",
      tel: "112",
    },
    {
      title: "Police",
      description: "Pour les urgences policières et les interventions",
      tel: "117",
    },
    {
      title: "Pompiers",
      description: "Pour les urgences incendie et de sauvetage",
      tel: "118",
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Search />

      <View style={styles.tabContainer}>
        <Tab
          value={index}
          onChange={setIndex}
          indicatorStyle={styles.indicator}
          variant="default"
          containerStyle={styles.tabBar}
        >
          {["All", "Santé", "Sécurité", "Incendie"].map((title, i) => (
            <Tab.Item
              key={i}
              title={title}
              titleStyle={[
                styles.tabTitle,
                index === i ? styles.activeTabTitle : null
              ]}
              buttonStyle={[
                styles.tabButton,
                index === i ? styles.activeTabButton : null
              ]}
            />
          ))}
        </Tab>
      </View>

      <View style={styles.tabViewContainer}>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={styles.tabViewItem}>
            <ListAppel data={contacts} />
          </TabView.Item>

          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.centerContent}>
              <Text>Santé Content</Text>
            </View>
          </TabView.Item>

          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.centerContent}>
              <Text>Sécurité Content</Text>
            </View>
          </TabView.Item>

          <TabView.Item style={styles.tabViewItem}>
            <View style={styles.centerContent}>
              <Text>Incendie Content</Text>
            </View>
          </TabView.Item>
        </TabView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Styles remain unchanged
  safeArea: {
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    ...baseThemedStyle,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    gap: 0,
    paddingTop: 0,
  },
  tabBar: {
    backgroundColor: 'transparent',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  indicator: {
    backgroundColor: 'transparent',
    height: 0,
  },
  tabButton: {
    borderRadius: 20,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    padding: 0
  },
  activeTabButton: {
    borderWidth: 1,
    borderColor: '#334ec4',
  },
  tabTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#595858',
    textAlign: 'center',
    flexShrink: 1,
    flexWrap: 'nowrap',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  activeTabTitle: {
    fontSize: 14,
    padding: 0
  },
  tabViewContainer: {
    ...baseThemedStyle,
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    gap: 0,
  },
  tabViewItem: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  centerContent: {
    ...baseThemedStyle,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});