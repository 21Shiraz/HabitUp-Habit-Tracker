import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Keyboard
} from "react-native";

export default function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink 8 glasses of water", done: false, icon: "💧" },
    { id: 2, name: "Exercise for 30 minutes", done: false, icon: "🏃" },
    { id: 3, name: "Read a book", done: false, icon: "📚" },
    { id: 4, name: "Wake up early", done: false, icon: "🌅" }
  ]);

  const [newHabit, setNewHabit] = useState("");
  const [tab, setTab] = useState("Today");

  const completed = habits.filter(h => h.done).length;

  const progress = habits.length
    ? Math.round((completed / habits.length) * 100)
    : 0;

  function addHabit() {
    const habitName = newHabit.trim();

    if (!habitName) {
      Alert.alert("Oops!", "Please enter a habit name.");
      return;
    }

    setHabits(current => [
      ...current,
      {
        id: Date.now(),
        name: habitName,
        done: false,
        icon: "⭐"
      }
    ]);

    setNewHabit("");
    Keyboard.dismiss();
  }

  function toggleHabit(id) {
    setHabits(current =>
      current.map(h =>
        h.id === id ? { ...h, done: !h.done } : h
      )
    );
  }

  function deleteHabit(id) {
    setHabits(current =>
      current.filter(h => h.id !== id)
    );
  }

  function resetHabits() {
    Alert.alert(
      "Reset habits?",
      "This will uncheck all your habits.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          onPress: () =>
            setHabits(current =>
              current.map(h => ({ ...h, done: false }))
            )
        }
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F6F2FF"
      />

      <View style={styles.content}>

        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>HabitUp ✨</Text>
            <Text style={styles.subtitle}>
              BUILD BETTER HABITS EVERY DAY
            </Text>
          </View>

          <Text style={styles.avatar}>👤</Text>
        </View>

        {/* TODAY SCREEN */}

        {tab === "Today" && (
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
          >

            {/* PROGRESS CARD */}

            <View style={styles.progressCard}>
              <Text style={styles.cardLabel}>
                Your daily progress
              </Text>

              <Text style={styles.percentage}>
                {progress}%
              </Text>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress}%` }
                  ]}
                />
              </View>

              <Text style={styles.cardFooter}>
                {completed} of {habits.length} habits completed
              </Text>
            </View>

            {/* HABITS */}

            <Text style={styles.sectionTitle}>
              Today's Habits 🎯
            </Text>

            {habits.map(habit => (
              <View key={habit.id} style={styles.habitCard}>

                <TouchableOpacity
                  style={styles.habitMain}
                  onPress={() => toggleHabit(habit.id)}
                >
                  <Text style={styles.habitIcon}>
                    {habit.icon}
                  </Text>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.habitName,
                        habit.done && styles.completedText
                      ]}
                    >
                      {habit.name}
                    </Text>

                    <Text style={styles.habitStatus}>
                      {habit.done
                        ? "Completed ✓"
                        : "Tap to complete"}
                    </Text>
                  </View>

                  <Text style={styles.check}>
                    {habit.done ? "✅" : "⭕"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Delete habit?",
                      "Are you sure you want to delete this habit?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel"
                        },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => deleteHabit(habit.id)
                        }
                      ]
                    )
                  }
                >
                  <Text style={styles.delete}>
                    Delete
                  </Text>
                </TouchableOpacity>

              </View>
            ))}

            {/* ADD HABIT */}

            <Text style={styles.sectionTitle}>
              Add a New Habit ➕
            </Text>

            <View style={styles.addBox}>

              <TextInput
                style={styles.input}
                placeholder="Enter your new habit..."
                placeholderTextColor="#999"
                value={newHabit}
                onChangeText={setNewHabit}
                autoCorrect={false}
                blurOnSubmit={false}
                returnKeyType="done"
                onSubmitEditing={addHabit}
              />

              <TouchableOpacity
                style={styles.addButton}
                onPress={addHabit}
                activeOpacity={0.8}
              >
                <Text style={styles.addButtonText}>
                  + Add Habit
                </Text>
              </TouchableOpacity>

            </View>

            {/* MOTIVATIONAL QUOTE */}

            <View style={styles.quoteCard}>
              <Text style={styles.quote}>
                "Small steps every day lead to big results." 🌱
              </Text>
            </View>

          </ScrollView>
        )}

        {/* ACHIEVEMENTS SCREEN */}

        {tab === "Achievements" && (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >

            <Text style={styles.sectionTitle}>
              Your Achievements 🏆
            </Text>

            {[
              [
                "🌱",
                "First Step",
                "Complete your first habit",
                completed >= 1
              ],
              [
                "🔥",
                "On Fire",
                "Complete all today's habits",
                habits.length > 0 && completed === habits.length
              ],
              [
                "⭐",
                "Superstar",
                "Complete at least 3 habits",
                completed >= 3
              ],
              [
                "💜",
                "Perfect Day",
                "Reach 100% progress",
                progress === 100 && habits.length > 0
              ]
            ].map((item, index) => (
              <View key={index} style={styles.achievement}>

                <Text style={styles.achievementIcon}>
                  {item[0]}
                </Text>

                <View style={{ flex: 1 }}>
                  <Text style={styles.achievementTitle}>
                    {item[1]}
                  </Text>

                  <Text style={styles.achievementDescription}>
                    {item[2]}
                  </Text>
                </View>

                <Text style={{ fontSize: 22 }}>
                  {item[3] ? "✅" : "🔒"}
                </Text>

              </View>
            ))}

          </ScrollView>
        )}

        {/* SETTINGS SCREEN */}

        {tab === "Settings" && (
          <ScrollView
            keyboardShouldPersistTaps="handled"
          >

            <Text style={styles.sectionTitle}>
              Settings ⚙️
            </Text>

            <View style={styles.settingCard}>
              <Text style={styles.settingTitle}>
                💜 HabitUp
              </Text>

              <Text style={styles.settingText}>
                Version 1.0.0
              </Text>

              <Text style={styles.settingText}>
                Build better habits, one day at a time.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetHabits}
            >
              <Text style={styles.resetText}>
                Reset Today's Progress
              </Text>
            </TouchableOpacity>

          </ScrollView>
        )}

      </View>

      {/* BOTTOM NAVIGATION */}

      <View style={styles.navigation}>

        {[
          ["Today", "🏠"],
          ["Achievements", "🏆"],
          ["Settings", "⚙️"]
        ].map(item => (
          <TouchableOpacity
            key={item[0]}
            style={[
              styles.navItem,
              tab === item[0] && styles.activeNav
            ]}
            onPress={() => {
              Keyboard.dismiss();
              setTab(item[0]);
            }}
          >

            <Text style={styles.navIcon}>
              {item[1]}
            </Text>

            <Text
              style={[
                styles.navText,
                tab === item[0] && styles.activeNavText
              ]}
            >
              {item[0]}
            </Text>

          </TouchableOpacity>
        ))}

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F6F2FF"
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    paddingVertical: 12
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#673AB7"
  },

  subtitle: {
    fontSize: 10,
    letterSpacing: 2,
    color: "#888",
    marginTop: 5
  },

  avatar: {
    fontSize: 25,
    backgroundColor: "#E7DCFF",
    padding: 12,
    borderRadius: 30
  },

  progressCard: {
    backgroundColor: "#673AB7",
    padding: 25,
    borderRadius: 25,
    marginBottom: 30
  },

  cardLabel: {
    color: "white",
    fontSize: 17
  },

  percentage: {
    color: "white",
    fontSize: 55,
    fontWeight: "bold",
    marginVertical: 12
  },

  progressBackground: {
    height: 12,
    backgroundColor: "#B9A2E5",
    borderRadius: 10,
    overflow: "hidden"
  },

  progressFill: {
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10
  },

  cardFooter: {
    color: "white",
    marginTop: 15,
    fontSize: 14
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#29213F",
    marginBottom: 17,
    marginTop: 5
  },

  habitCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12
  },

  habitMain: {
    flexDirection: "row",
    alignItems: "center"
  },

  habitIcon: {
    fontSize: 27,
    marginRight: 13
  },

  habitName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#302747"
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#999"
  },

  habitStatus: {
    color: "#999",
    fontSize: 12,
    marginTop: 5
  },

  check: {
    fontSize: 23,
    marginLeft: 10
  },

  delete: {
    color: "#E05C68",
    fontSize: 12,
    marginTop: 12,
    textAlign: "right"
  },

  addBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 18
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5DDF5",
    padding: 13,
    borderRadius: 12,
    fontSize: 15,
    color: "#302747"
  },

  addButton: {
    backgroundColor: "#673AB7",
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center"
  },

  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15
  },

  quoteCard: {
    backgroundColor: "#E9DFFF",
    padding: 20,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 25
  },

  quote: {
    color: "#673AB7",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600"
  },

  achievement: {
    backgroundColor: "white",
    borderRadius: 17,
    padding: 17,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center"
  },

  achievementIcon: {
    fontSize: 30,
    marginRight: 15
  },

  achievementTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#302747"
  },

  achievementDescription: {
    color: "#888",
    fontSize: 12,
    marginTop: 5
  },

  settingCard: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 18,
    marginBottom: 20
  },

  settingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#673AB7",
    marginBottom: 12
  },

  settingText: {
    color: "#888",
    marginTop: 8
  },

  resetButton: {
    backgroundColor: "#673AB7",
    padding: 17,
    borderRadius: 14,
    alignItems: "center"
  },

  resetText: {
    color: "white",
    fontWeight: "bold"
  },

  navigation: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 25,
    padding: 7,
    justifyContent: "space-around"
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20
  },

  activeNav: {
    backgroundColor: "#E9DFFF"
  },

  navIcon: {
    fontSize: 21
  },

  navText: {
    fontSize: 11,
    color: "#777",
    marginTop: 4
  },

  activeNavText: {
    color: "#673AB7",
    fontWeight: "bold"
  }

});
