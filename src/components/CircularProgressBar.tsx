import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
import useGoal from '../store/actions/useGoal';

interface CircularProgressBarProps {
  progress: number;
  distance: number;
  size: number;
  strokeWidth: number;
  color: string;
}

function CircularProgressBar(prop: CircularProgressBarProps): JSX.Element {
  const goal = useSelector((state: RootState) => state.goal);
  const radius = (prop.size - prop.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = ((goal.stepCount - prop.progress)/ goal.stepCount ) * circumference;
  const [isEditing, setIsEdtiting] = useState(false);
  const [stepGoal, setStepGoal] = useState(goal.stepCount);
  const { setGoals } = useGoal();

  const openEdit = () => {
    setIsEdtiting(true);
  }

  return (
    <View style={styles.container}>
      <Svg width={prop.size} height={prop.size} viewBox={`0 0 ${prop.size} ${prop.size}`}>
        <G rotation="-90" origin={`${prop.size / 2}, ${prop.size / 2}`}>
          <Circle
            cx={prop.size / 2}
            cy={prop.size / 2}
            r={radius}
            strokeWidth={prop.strokeWidth}
            strokeLinecap="round"
            strokeOpacity={0.2}
            stroke="#ddd"
            fill="transparent"
          />
          <Circle
            cx={prop.size / 2}
            cy={prop.size / 2}
            r={radius}
            strokeWidth={prop.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            stroke={prop.color}
            fill="transparent"
          />
        </G>
      </Svg>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={openEdit}>
          {isEditing ? <View style={styles.inputContainer}>
          <Text style={styles.progressText}>{prop.progress}/</Text>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            returnKeyLabel='Done'
            onChangeText={text => {
              const value = text.length > 0 ? text.replace(/[^0-9\.]+/g, '') : '0';
              setStepGoal(parseInt(value))
            }}
            onSubmitEditing={() => {
              setGoals({step: stepGoal});
              setIsEdtiting(false);
            }}
            value={stepGoal.toString()}
            placeholder="Set Your Goal"
            keyboardType="numeric"
          />
          <Text style={styles.progressText}> steps</Text>
          </View> : <Text style={styles.progressText}>{prop.progress}/{goal.stepCount} steps</Text>}
        </TouchableOpacity>
        <Text style={styles.distanceText}>{prop.distance.toFixed(2)} m</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A1078'
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A1078'
  },
  distanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2F58CD'
  },
});


export default CircularProgressBar;