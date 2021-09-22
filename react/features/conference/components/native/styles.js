var {StyleSheet, PixelRatio} = require('react-native');

import { ColorSchemeRegistry, schemeColor } from '../../../base/color-scheme';
import { BoxModel, ColorPalette, fixAndroidViewClipping } from '../../../base/styles';

export const INSECURE_ROOM_NAME_LABEL_COLOR = ColorPalette.warning;

var FONT_TITLE   = 30;

if (PixelRatio.get() <= 3) {
  FONT_TITLE = 26;
}

console.log(PixelRatio.get())


/**
 * The styles of the feature conference.
 */
const toolbarButton = {
    borderRadius: 3,
    borderWidth: 0,
    flex: 0,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 6,
    width: 44
};

const toolbarButtonIcon = {
    alignSelf: 'center',
    color: ColorPalette.darkGrey,
    fontSize: 44
};

const whiteToolbarButtonIcon = {
    ...toolbarButtonIcon,
    color: ColorPalette.white
};

export default {

    /**
     * {@code Conference} style.
     */
    conference: fixAndroidViewClipping({
        alignSelf: 'stretch',
        backgroundColor: '#040404',
        flex: 1
    }),

    displayNameContainer: {
        margin: 10
    },

    /**
     * View that contains the indicators.
     */
    indicatorContainer: {
        flex: 1,
        flexDirection: 'row'
    },


    lonelyButton: {
        alignItems: 'center',
        borderRadius: 24,
        flexDirection: 'row',
        height: 48,
        justifyContent: 'space-around',
        paddingHorizontal: 12
    },

    lonelyButtonComponents: {
        marginHorizontal: 6
    },

    lonelyMeetingContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        padding: BoxModel.padding * 2,
        flex:1
    },

    buttonStylesBorderless: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...toolbarButton,
            backgroundColor: 'transparent'
        }
    },

    backButtonStyles: {
        alignSelf: 'center',
        color: ColorPalette.darkGrey,
        fontSize: 20,
        borderRadius: 3,
        borderWidth: 0,
        flex: 0,
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 6,
        width: 30,
        underlayColor: ColorPalette.buttonUnderlay
    },

    backgroundToggle: {
        backgroundColor: ColorPalette.toggled
    },

    lonelyMessage: {
        paddingVertical: 12
    },

    pipButtonContainer: {
        position: 'absolute',
        top: 30,
        left: 15,
        zIndex: 1
    },

    pipButton: {
        iconStyle: {
            color: ColorPalette.white,
            fontSize: 24
        },
        underlayColor: 'transparent'
    },

    navBarSafeView: {
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },

    navBarWrapper: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        height: 44,
        justifyContent: 'center',
        paddingHorizontal: 14
    },

    timerBarWrapper: {
        marginTop: '25%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 100,
    },

    avatarWrapper: {
        alignItems: 'center',
        borderRadius: 25,
        justifyContent: 'center',
        overflow: 'hidden',
        width: 200,
        height: 200,
    },

    displayNameWrapper: {
        color: '#fff',
        flexShrink: 1,
        fontSize: FONT_TITLE,
        marginTop: 25,
        opacity: 0.90,
        textAlign: 'center'
    },

    roomTimer: {
        color: ColorPalette.white,
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center'
    },

    roomTimerView: {
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        justifyContent: 'center',
        marginTop: 20,
        width: 200,
        height: 30
    },

    roomName: {
        color: ColorPalette.white,
        fontSize: 14,
        fontWeight: '400'
    },

    roomNameView: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
        flexShrink: 1,
        height: 28,
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    roomNameWrapper: {
        position: 'absolute',
        top: 30,
        right: 15,
        zIndex: 1
    },

    /**
     * The style of the {@link View} which expands over the whole
     * {@link Conference} area and splits it between the {@link Filmstrip} and
     * the {@link Toolbox}.
     */
    toolboxAndFilmstripContainer: {
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },

    insecureRoomNameLabel: {
        backgroundColor: INSECURE_ROOM_NAME_LABEL_COLOR
    },

    infoWrapper: {
        // display: 'flex',
        // flexDirection: 'column',
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        top: 0
    }
};

ColorSchemeRegistry.register('Conference', {
    lonelyButton: {
        backgroundColor: schemeColor('inviteButtonBackground')
    },

    lonelyMessage: {
        color: schemeColor('onVideoText')
    }
});
