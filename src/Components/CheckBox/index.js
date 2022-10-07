import React from 'react'
import { MaterialIcons } from '../IconManager';
import { Theme } from '../../Constant/Theme';

import { TouchableOpacity, Text } from 'react-native'

const checkbStyle = {
    flexDirection: 'row',
    alignItems: 'center'
}

const CheckBox = ({ selected, onPress, style, textStyle, size = 20, color = Theme.colors.brandColor, text = '', ...props }) => (
    <TouchableOpacity style={[checkbStyle, style]} onPress={onPress} {...props}>
        {MaterialIcons(selected ? 'check-box' : 'check-box-outline-blank', size, color)}
        <Text style={textStyle}> {text} </Text>
    </TouchableOpacity>
)

export default CheckBox