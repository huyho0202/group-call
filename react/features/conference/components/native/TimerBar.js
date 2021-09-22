// @flow

import React from 'react';
import { Text, View } from 'react-native';

import { getConferenceName } from '../../../base/conference';
import { getFeatureFlag, CONFERENCE_TIMER_ENABLED, MEETING_NAME_ENABLED } from '../../../base/flags';
import { connect } from '../../../base/redux';
import { PictureInPictureButton } from '../../../mobile/picture-in-picture';
import { isToolboxVisible } from '../../../toolbox/functions.native';
import ConferenceTimer from '../ConferenceTimer';

import { Avatar } from '../../../base/avatar';

import { getParticipantById } from '../../../base/participants';

import OverflowMenuButton from '../../../toolbox/components/native/OverflowMenuButton';
import BackButton from '../../../toolbox/components/BackButton';

import Labels from './Labels';
import styles from './styles';


type Props = {

    /**
     * Whether displaying the current conference timer is enabled or not.
     */
    _conferenceTimerEnabled: boolean,

    /**
     * Name of the meeting we're currently in.
     */
    _meetingName: string,

    /**
     * Whether displaying the current meeting name is enabled or not.
     */
    _meetingNameEnabled: boolean,

    /**
     * True if the navigation bar should be visible.
     */
    _visible: boolean
};

/**
 * Implements a navigation bar component that is rendered on top of the
 * conference screen.
 *
 * @param {Props} props - The React props passed to this component.
 * @returns {React.Node}
 */
const TimerBar = (props: Props) => {
    if (!props._visible) {
        return null;
    }

    let displayName = props.displayName
    if (props.displayName && props.displayName.length > 18) {
        displayName = props.displayName.slice(0, 18) + ' ...'
    }

    return (
        <View pointerEvents = 'box-none' style = { styles.timerBarWrapper }>
            {props._conferenceTimerEnabled && <View style={styles.infoWrapper}>
                <Avatar participantId = { props.participantId } size={150} style={styles.avatarContainer} />
                {(props.displayName !== '') && <Text style={styles.displayNameWrapper}>{displayName}</Text>}
                <View style = { styles.roomTimerView }>
                    <ConferenceTimer textStyle = { styles.roomTimer } />
                </View>
            </View>}
        </View>
    );
};

/**
 * Maps part of the Redux store to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function _mapStateToProps(state, props) {
    const { hideConferenceTimer, hideConferenceSubject } = state['features/base/config'];

    const _participant: ?Object = props.participantId && getParticipantById(state, props.participantId);
    const displayName =_participant?.name ?? "";

    return {
        displayName: displayName,
        _conferenceTimerEnabled:
            getFeatureFlag(state, CONFERENCE_TIMER_ENABLED, true) && !hideConferenceTimer,
        _meetingName: getConferenceName(state),
        _meetingNameEnabled:
            getFeatureFlag(state, MEETING_NAME_ENABLED, true) && !hideConferenceSubject,
        _visible: isToolboxVisible(state)
    };
}

export default connect(_mapStateToProps)(TimerBar);
