import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface ButtonProps {
    buttonTitle: string;
    onPress: any;
}

const { height, fontScale } = Dimensions.get("window");
function BottomButton(prop: ButtonProps): JSX.Element {

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={prop.onPress}>
            <Text style={styles.buttonText}>{prop.buttonTitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '88%',
        height: height / 12,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: "rgb(0,  0,  0)",
        shadowOpacity: 0.1607843137254902,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 6,
        elevation: 10,
        position: 'absolute',
        bottom: 50
    },
    buttonText: {
        fontWeight: '600',
        color: '#57C5B6',
        fontSize: 18 * fontScale
    },
});

export default React.memo(BottomButton);