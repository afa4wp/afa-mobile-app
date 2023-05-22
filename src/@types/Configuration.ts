import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

interface ConfigurationItem {
  label: string;
  iconName: string;
  onPress: () => void;
  vectorIcon?: any;
}

export type { ConfigurationItem };
