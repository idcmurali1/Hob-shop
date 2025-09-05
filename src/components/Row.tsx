import React from 'react';
import { View, Text } from 'react-native';
export default function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }){
  return (
    <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
      <Text style={{ fontWeight: bold ? '700' : '400' }}>{label}</Text>
      <Text style={{ fontWeight: bold ? '700' : '400' }}>{value}</Text>
    </View>
  );
}
