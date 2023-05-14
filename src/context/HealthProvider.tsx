// context/HealthProvider.tsx

import React, { ReactNode, useState, useEffect } from 'react';
import { createContext } from 'use-context-selector';
import AppleHealthKit, { HealthKitPermissions, HealthUnit } from 'react-native-health';

/* Permission options */
const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.StepCount,
        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning
      ]
    }
  } as HealthKitPermissions

interface HealthContextType {
  init: () => void;
  todayStepCount: number | null;
  dailyStepSamples: Array<{
    key: string;
    title: string;
    day: string;
    step: number;
  }>;
  todayWalkingDistance: number | null;
  dailyWalkingDistance: Array<{
    key: string;
    title: string;
    day: string;
    distance?: number;
  }>;
  dailyData: Array<{
    key: string;
    title: string;
    day: string;
    step: number;
    distance?: number;
  }>;
}

interface StepCountOptions {
  date?: string;
  includeManuallyAdded?: boolean;
}

interface WalkingDistanceOptions {
  unit?: HealthUnit;
  date?: string;
  includeManuallyAdded?: boolean;
}

interface StepResult {
  key: string;
  title: string;
  day: string;
  step: number;
}

interface DistanceResult {
  key: string;
  title: string;
  day: string;
  distance?: any;
}

interface DailyData extends StepResult, DistanceResult {}

var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const HealthContext = createContext<HealthContextType | null>(null);

interface HealthProviderProps {
  children: ReactNode;
}

const mergeById = (a1: StepResult[], a2: DistanceResult[]): DailyData[] =>
  a1.map((itm): DailyData => ({
    ...a2.find((item) => item.key === itm.key),
    ...itm,
  }));


export const HealthProvider: React.FC<HealthProviderProps> = ({ children }) => {
  const { todayStepCount } = useTodayStepCount();
  const { dailyStepSamples } = useDailyStepSample();
  const { todayWalkingDistance } = useTodayWalkingDistance();
  const { dailyWalkingDistance } = useDailyWalkingDistanceSample();
  const dailyData: DailyData[] = mergeById(dailyStepSamples, dailyWalkingDistance);

  const init = () => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {``
        if(error) {
            console.log('[ERROR] Cannot grant permissions!');
            return;
        }
    })
  };

  return (
    <HealthContext.Provider
      value={{
        init,
        todayStepCount,
        dailyStepSamples,
        dailyData,
        todayWalkingDistance,
        dailyWalkingDistance
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

const useTodayStepCount = (options: StepCountOptions = {}) => {
  const [todayStepCount, setodayStepCount] = useState<number | null>(null);

  useEffect(() => {

      const stepCountOptions: StepCountOptions = {
        date: options.date || new Date().toISOString(),
        includeManuallyAdded: options.includeManuallyAdded || true,
      };

      AppleHealthKit.getStepCount(stepCountOptions, (err: Object, results: any) => {
        if (err) {
          console.error('Error fetching step count:', err);
          return;
        }
        setodayStepCount(results.value);
      });
  }, [options]);

  return {
    todayStepCount,
  };
};

const useDailyStepSample = () => {
  const [dailyStepSamples, setDailyStepSamples] = useState<Array<{
    key: string;
    title: string;
    day: string;
    step: number;
  }>>([]);

  useEffect(() => {

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const endDate = (new Date()).toISOString();

      const stepCountOptions = {
        startDate: startDate.toISOString(),
        endDate: endDate,
      };
      AppleHealthKit.getDailyStepCountSamples(stepCountOptions, (err: Object, results: Array<{
        startDate: string;
        endDate: string;
        value: number;
      }>) => {
        if (err) {
          console.error('Error fetching step count:', err);
          return;
        }
        const temp = results.map((c, i) => {
          let tempDate = new Date(c.startDate);
          var date = tempDate.getDate() + "-" + tempDate.getMonth() + "-" + tempDate.getFullYear();
          return { step: c.value, key: date, title: date, day: days[tempDate.getDay()] };
        });
        const result = temp.reduce<StepResult[]>((acc, curr) => {
          const objInAcc = acc.find((o) => o.key === curr.key && o.title === curr.title && o.day === curr.day);
          if (objInAcc) objInAcc.step += curr.step;
          else acc.push(curr);
          return acc;
        }, []);
      
        setDailyStepSamples(result);
      });
  }, []);

  return {
    dailyStepSamples,
  };
};

const useTodayWalkingDistance = (options: WalkingDistanceOptions = {}) => {
  const [todayWalkingDistance, setTodayWalkingDistance] = useState<number | null>(null);

  useEffect(() => {

      const walkingDistanceOptions: WalkingDistanceOptions = {
        // unit: options.unit || 'meter',
        date: options.date || new Date().toISOString(),
        includeManuallyAdded: options.includeManuallyAdded || true,
      };

      AppleHealthKit.getDistanceWalkingRunning(walkingDistanceOptions, (err: Object, results: any) => {
        if (err) {
          console.error('Error fetching step count:', err);
          return;
        }
        setTodayWalkingDistance(results.value);
      });
  }, [options]);

  return {
    todayWalkingDistance,
  };
};

const useDailyWalkingDistanceSample = () => {
  const [dailyWalkingDistance, setDailyWalkingDistance] = useState<Array<{
    key: string;
    title: string;
    day: string;
    distance?: number;
  }>>([]);

  useEffect(() => {

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const endDate = (new Date()).toISOString();

      const walkingDistanceOptions = {
        startDate: startDate.toISOString(),
        endDate: endDate,
        ascending: false,
        limit: 10,
      };

      AppleHealthKit.getDailyDistanceWalkingRunningSamples(walkingDistanceOptions, (err: Object, results: Array<{
        startDate: string;
        endDate: string;
        value: number;
      }>) => {
        if (err) {
          console.error('Error fetching step count:', err);
          return;
        }
        const temp = results.map((c, i) => {
          let tempDate = new Date(c.startDate);
          var date = tempDate.getDate() + "-" + tempDate.getMonth() + "-" + tempDate.getFullYear();
          return { distance: c.value, key: date, title: date, day: days[tempDate.getDay()]  };
        });
        const result = temp.reduce<DistanceResult[]>((acc, curr) => {
          const objInAcc = acc.find((o) => o.key === curr.key && o.title === curr.title && o.day === curr.day);
          if (objInAcc) objInAcc.distance += curr.distance;
          else acc.push(curr);
          return acc;
        }, []);
        setDailyWalkingDistance(result);
      });
  }, []);

  return {
    dailyWalkingDistance,
  };
};