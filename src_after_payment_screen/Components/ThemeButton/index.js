import React from 'react'
import { StyleSheet } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from 'react-native-elements';

export default props => {
    return (
        <Button
            title={props.title}
            containerStyle={[styles.containerstyle, props.containerStyle]}
            buttonStyle={[styles.buttonStyle, props.buttonStyle]}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    containerstyle: {
        width: 200,
    },
    buttonStyle: {
        backgroundColor: 'rgba(78, 116, 289, 1)',
        borderRadius: 3,
    }
})