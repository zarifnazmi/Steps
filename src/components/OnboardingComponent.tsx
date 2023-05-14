import React from 'react';
import {
    Text,
    StatusBar,
    StyleSheet,
    Dimensions
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieAnimation from './LottieAnimation';
import BottomBtn from './BottomBtn';

interface OnboardingProps {
    source: any;
    title: string;
    description: string;
    buttonTitle: string;
    onPress: any;
}

const { height, fontScale } = Dimensions.get("window");
function OnboardingComponent(prop: OnboardingProps): JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#57C5B6' barStyle={'light-content'} />
        <LottieAnimation source={prop.source} />
        <Text style={styles.title}>{prop.title}</Text>
        <Text style={styles.description}>{prop.description}</Text>
        <BottomBtn buttonTitle={prop.buttonTitle} onPress={prop.onPress}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#57C5B6'
    },
    title: {
      fontSize: 24 * fontScale,
      fontWeight: 'bold',
      color: '#000',
      marginTop: height * 0.08
    },
    description: {
      fontSize: 16 * fontScale,
      color: '#000',
      marginTop: height * 0.02,
      textAlign: 'center'
    },
});  

export default React.memo(OnboardingComponent);