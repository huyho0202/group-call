// @flow

import { BoxModel, ColorPalette } from '../../styles';

/**
 * The styles of the feature base/participants.
 */
export default {
    /**
     * Container for the avatar in the view.
     */
    avatarContainer: {
        position: 'absolute', 
        top: 135, 
        left: 0, 
        right: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    participantNameLabel: {
        color: ColorPalette.white,
        flexShrink: 1,
        fontSize: 30,
        marginTop: 25,
        opacity: 0.90
    },

    roomTimer: {
        color: ColorPalette.white,
        fontSize: 18,
        fontWeight: '400',
        paddingHorizontal: 8,
        marginTop: 10
    },

    roomTimerView: {
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        height: 28,
        justifyContent: 'center',
        minWidth: 50
    },

    /**
     * Style for the text rendered when there is a connectivity problem.
     */
    connectionInfoText: {
        color: ColorPalette.white,
        fontSize: 12,
        marginVertical: BoxModel.margin,
        marginHorizontal: BoxModel.margin,
        textAlign: 'center'
    },

    /**
     * Style for the container of the text rendered when there is a
     * connectivity problem.
     */
    connectionInfoContainer: {
        alignSelf: 'center',
        backgroundColor: ColorPalette.darkGrey,
        borderRadius: 20,
        marginTop: BoxModel.margin
    },

    /**
     * {@code ParticipantView} style.
     */
    participantView: {
        alignItems: 'stretch',
        flex: 1,
        justifyContent: 'center'
    }
};
