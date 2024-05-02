import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [connectionInfo, setConnectionInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionInfo(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <Text>Network Connectivity:</Text>
      {connectionInfo === null ? (
        <Text>Checking...</Text>
      ) : (
        <Text>{connectionInfo.isConnected ? 'Connected' : 'Disconnected'}</Text>
      )}
    </View>
  );
};

export default App;