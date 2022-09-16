import { NokoraBold } from '@customs/customFont'
import _styles from '@styles'
import modules from 'modules'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal"

interface Props {
    data: any
    isVisible: boolean
    toggleModal: () => void
}

const DetailModal = ({ isVisible, data, toggleModal }: Props) => {
    return (
        <View style={styles.container}>
            <Modal
                isVisible={isVisible}
                onBackdropPress={toggleModal}
                backdropOpacity={0.3}
            >
                <View style={styles.modal}>
                    <View>
                        <Text style={styles.title}>{data?.label || 'Title'}</Text>
                    </View>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Totam consequatur obcaecati vel, voluptates nesciunt necessitatibus
                        rerum praesentium sint asperiores dignissimos voluptatibus
                        maiores eos, harum tempora ipsum optio veritatis, officia quaerat.
                    </Text>
                </View>
            </Modal>
        </View>
    )
}

export default DetailModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
    },
    modal: {
        ..._styles.shadow,
        backgroundColor: modules.WHITE,
        borderRadius: modules.CARD_RADIUS,
        paddingVertical: modules.BODY_HORIZONTAL_24,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
    },
    title: {
        ...NokoraBold,
        fontSize: modules.FONT_H5,
    },
})
