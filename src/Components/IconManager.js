import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import Iconf from 'react-native-vector-icons/FontAwesome'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'


import { scale } from './responsive-ratio';

export const MaterialIcons = (name, size, color) => <Icon2 name={name} color={color} size={scale(size)} />
export const FontAwesome = (name, size, color) => <Iconf name={name} color={color} size={scale(size)} />
export const Ionicons = (name, size, color,style) => <Icon name={name} color={color} size={scale(size)} style={style} />
export const Material = (name, size, color) => <IconM name={name} color={color} size={scale(size)} />
export const Feather = (name, size, color) => <Icon1 name={name} color={color} size={scale(size)} />