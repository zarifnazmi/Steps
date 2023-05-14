import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    useWindowDimensions
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularProgressBar from '../components/CircularProgressBar';
import { useContextSelector } from 'use-context-selector';
import { HealthContext } from '../context/HealthProvider';
import { TabBar, Route, SceneRendererProps, TabView, SceneMap } from 'react-native-tab-view';

type CustomRoute = Route & {
  step: number;
  distance: number;
};

type CustomSceneProps = SceneRendererProps & {
  route: CustomRoute;
};

interface DailyDataItem {
  key: string;
  title: string;
  day: string;
  step: number;
  distance?: number;
}

interface SceneProps {
  step: number;
  distance: number;
}

export default function ProgressScreen() {
    const dailyData = useContextSelector(HealthContext, state => state!.dailyData);

    const FirstRoute = ({ route }: CustomSceneProps) => (
      <View style={styles.container} >
        <CircularProgressBar
        distance={route.distance}
        progress={route.step}
        size={350} 
        strokeWidth={30} 
        color="#57C5B6" 
      />
      </View>
    );

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [scene, setScene] = useState({});
    const [routes, setRoutes] = useState<CustomRoute[]>([]);

    const createSceneComponent = (Component: React.ComponentType<CustomSceneProps>) => {
      return (props: CustomSceneProps) => {
        return <Component {...props} />;
      };
    };
      
    
    const renderScene = SceneMap(scene);

    useEffect(() =>{
      type HashType = { [key: string]: typeof FirstRoute };
      let hash: HashType = {};

      dailyData.map(function (obj: DailyDataItem) {
        hash[obj.key] = createSceneComponent(FirstRoute)
        setRoutes(routes => [...routes, {key: obj.key, title: obj.day, step: obj.step, distance: obj.distance ? obj.distance : 0}]);
      });
      setScene(hash);
    }, [])

    const renderTabBar = (props: any) => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#57C5B6' }}
        labelStyle={{ color: '#57C5B6' }}
        style={{ backgroundColor: '#FBFCF6' }}
      />
    );

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#FBFCF6' barStyle={'dark-content'} />
        <TabView
          navigationState={{ index, routes }}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FBFCF6'
    }
});  
