// @flow

import { openDialog } from '../../../base/dialog';
import { getFeatureFlag, OVERFLOW_MENU_ENABLED } from '../../../base/flags';
import { translate } from '../../../base/i18n';
import { IconAddPeople } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';

import InviteList from './InviteList';

/**
 * The type of the React {@code Component} props of {@link InviteListButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An implementation of a button for showing the {@code OverflowMenu}.
 */
class InviteListButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.moreActions';
    icon = IconAddPeople;
    label = 'toolbar.moreActions';

    /**
     * Handles clicking / pressing this {@code InviteListButton}.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(openDialog(InviteList));
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code InviteListButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state): Object {
    const enabledFlag = getFeatureFlag(state, OVERFLOW_MENU_ENABLED, true);

    return {
        visible: enabledFlag
    };
}

export default translate(connect(_mapStateToProps)(InviteListButton));
