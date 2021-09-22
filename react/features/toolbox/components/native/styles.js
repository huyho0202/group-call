// @flow

import { ColorSchemeRegistry, schemeColor } from '../../../base/color-scheme';
import { BoxModel, ColorPalette } from '../../../base/styles';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const BUTTON_SIZE = (windowWidth > 400) ? 54 : 50;

// Toolbox, toolbar:

/**
 * The style of toolbar buttons.
 */
const toolbarButton = {
    borderRadius: 3,
    borderWidth: 0,
    flex: 0,
    flexDirection: 'row',
    height: BUTTON_SIZE,
    justifyContent: 'center',
    // marginHorizontal: 10,
    marginTop: 6,
    width: BUTTON_SIZE
};

/**
 * The icon style of the toolbar buttons.
 */
const toolbarButtonIcon = {
    alignSelf: 'center',
    color: ColorPalette.darkGrey,
    fontSize: BUTTON_SIZE
};


/**
 * The icon style of toolbar buttons which display white icons.
 */
const whiteToolbarButtonIcon = {
    ...toolbarButtonIcon,
    color: ColorPalette.white
};

/**
 * The Toolbox and toolbar related styles.
 */
const styles = {
    buttonSise: BUTTON_SIZE,
    expandMenuContainer: {
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'column'
    },

    sheetGestureRecognizer: {
        alignItems: 'stretch',
        flexDirection: 'column'
    },

    // toolbox: {
    //     alignItems: 'center',
    //     // backgroundColor: ColorPalette.darkBackground,
    //     borderTopLeftRadius: 3,
    //     borderTopRightRadius: 3,
    //     flexDirection: 'row',
    //     flexGrow: 0,
    //     justifyContent: 'space-between',
    //     paddingHorizontal: BoxModel.margin,
    //     paddingVertical: 50
    // },

    // toolboxContainer: {
    //     flexDirection: 'column',
    //     flexGrow: 0,
    //     width: '100%',
    //     marginLeft: 'auto',
    //     marginRight: 'auto'
    // },

    toolboxContainer: {
        flexDirection: 'column',
        flexGrow: 0,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingRight: 15,
        paddingLeft: 15,
    },

    toolbox: {
        flexDirection: 'row',
        flexGrow: 0,
        justifyContent: 'space-between',
        paddingVertical: 50,
        alignItems: 'center'
    },

    container: {
      alignItems: 'center',
      flexGrow: 0,
      paddingBottom: 50,
      width: '100%'
    },

    headerContact: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    leftContainer: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      height: 60
    },

    closeWrapper: {
      flex: 0.5,
      width: 50,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      top: -15,
    },

    text: {
      fontSize: 20,
      color: '#101010',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      width: 200,
      padding: 5
    },

    listContact: {
      alignItems: 'stretch',
      width: '100%',
      paddingBottom: 30
    },

    listItem: {
      marginTop: 10,
      backgroundColor: '#fff',
      flexDirection: 'row',
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 10
    },

    coverImage: {
      width: 44,
      height: 44,
      borderRadius: 50
    },

    containerAvatar: {
      flexGrow: 1,
      alignItems: 'center',
    },

    containerFullName: {
      height: 64,
      flexGrow: 3,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#b7b7b7',
      alignItems: 'center',
    },

    avatarStyle: {
      width: 44,
      height: 44,
      borderRadius: 50,
      backgroundColor: '#65d5d1',
      color: '#fff',
    },

    avatarText: {
      color: '#fff',
      lineHeight: 44,
      textAlign: 'center',
      flexGrow: 1
    },

    metaInfo: {
      marginTop: 4
    },

    title: {
      fontSize: 16,
      width: 200,
      color: '#141414'
    },

    btnInvite: {
      flex: 1,
      alignItems: 'flex-end',
    },

    buttonInvite: {
      width: 50,
      height:32,
      borderRadius: 10,
      backgroundColor: '#fdf2ea',
    },

    btnInviteText: {
      textAlign: 'center',
      lineHeight: 32,
      color: '#f5773e'
    },

    buttonInviteDisable: {
      width: 50,
      height:32,
      borderRadius: 10,
      backgroundColor: '#efeded',
    },

    btnInviteTextDisable: {
      textAlign: 'center',
      lineHeight: 32,
      color: '#959595'
    },

};

export default styles;

/**
 * Color schemed styles for the @{Toolbox} component.
 */
ColorSchemeRegistry.register('Toolbox', {
    /**
     * Styles for buttons in the toolbar.
     */
    buttonStyles: {
        iconStyle: toolbarButtonIcon,
        style: toolbarButton
    },

    buttonStylesBorderless: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...toolbarButton,
            backgroundColor: 'transparent'
        }
    },

    backgroundToggle: {
        backgroundColor: ColorPalette.toggled
    },

    hangupButtonStyles: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...toolbarButton,
            // backgroundColor: schemeColor('hangup')
        },
        underlayColor: ColorPalette.buttonUnderlay
    },

    /**
     * Styles for toggled buttons in the toolbar.
     */
    toggledButtonStyles: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...toolbarButton
        }
    }
});
