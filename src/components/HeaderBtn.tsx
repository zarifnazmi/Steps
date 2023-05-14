import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface ButtonProps {
    buttonTitle: string;
    onPress: any;
}

const { height, fontScale } = Dimensions.get("window");
function HeaderBtn(prop: ButtonProps): JSX.Element {

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={prop.onPress}>
            <Text style={styles.buttonText}>{prop.buttonTitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#57C5B6',
        shadowColor: "#000",
        borderColor: "#000",
        padding : 10,
        shadowRadius: 5,
        borderTopRightRadius: 28,
        borderTopLeftRadius: 28,
        borderBottomRightRadius: 28,
        borderBottomLeftRadius: 28,
        shadowOpacity: 0.3,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
        },
    buttonText: {
        fontWeight: '600',
        color: '#FFFFFF',
        fontSize: 18 * fontScale
    },
});

export default React.memo(HeaderBtn);