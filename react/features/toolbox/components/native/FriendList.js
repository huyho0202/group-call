// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Text, SafeAreaView, View, FlatList, ActivityIndicator, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { BottomSheet, hideDialog, isDialogOpen } from '../../../base/dialog';
import { IconDragHandle, IconCloseInviteList, Icon } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { StyleType } from '../../../base/styles';
import { SharedDocumentButton } from '../../../etherpad';
import { NewInviteButton } from '../../../invite';
import { AudioRouteButton } from '../../../mobile/audio-mode';
import { LiveStreamButton, RecordButton } from '../../../recording';
import SecurityDialogButton from '../../../security/components/security-dialog/SecurityDialogButton';
import { SharedVideoButton } from '../../../shared-video/components';
import { ClosedCaptionButton } from '../../../subtitles';
import { TileViewButton } from '../../../video-layout';
import { getMovableButtons } from '../../functions.native';
import HelpButton from '../HelpButton';
import MuteEveryoneButton from '../MuteEveryoneButton';
import MuteEveryonesVideoButton from '../MuteEveryonesVideoButton';

import AudioOnlyButton from './AudioOnlyButton';
import MoreOptionsButton from './MoreOptionsButton';
import RaiseHandButton from './RaiseHandButton';
import ScreenSharingButton from './ScreenSharingButton.js';
import ToggleCameraButton from './ToggleCameraButton';

import styles from './styles';
import { translate } from '../../../base/i18n';

import { getFeatureFlag } from '../../../base/flags/functions';

import { jitsiLocalStorage } from '@jitsi/js-utils';

import {NativeModules, Platform} from 'react-native';

const InviteFriend = NativeModules.InviteFriend;



type Props = {
    _bottomSheetStyles: StyleType,
    _isOpen: boolean,
    _recordingEnabled: boolean,
    _width: number,

    dispatch: Function
};

type State = {
    scrolledToTop: boolean,
    showMore: boolean
}

let FriendList_;

class FriendList extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            scrolledToTop: true,
            showMore: false,
            arrUser: [],
            arrUserOrigin: [],
            arrUserInvited: [],
            query: ''
        };

        // Bind event handlers so they are only bound once per instance.
        this._onCancel = this._onCancel.bind(this);
        this._onSwipe = this._onSwipe.bind(this);
        this._onToggleMenu = this._onToggleMenu.bind(this);
        this._renderMenuExpandToggle = this._renderMenuExpandToggle.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.renderHeader = this.renderHeader.bind(this);

        this.cdn_endpoint =  ''
        this.api_endpoint = ''
        this.api_registered_users = ''
        this.api_user_info = ''
        this.token = ''
    }

    componentDidMount() {

      try {
        let settings = JSON.parse(jitsiLocalStorage['_storage']['features/base/settings'])

        this.token = settings.tokenNetalo
        this.cdn_endpoint = this.checkedLink(settings.cdnEndpoint)
        this.api_endpoint = this.checkedLink(settings.apiEndpoint)

        this.api_registered_users = this.api_endpoint + 'api/registered_users.json'
        this.api_user_info = this.api_endpoint + 'api/session.json'

        // this.fetchRegisteredUsers()
        this.helpGetUserinfoAndLogin()

      } catch(e) {}
    }

    checkedLink(link) {
      if (link && link.slice(-1) !== '/') {
        return link + '/'
      } else {
        return link
      }
    }

    helpGetUserinfoAndLogin () {
      fetch(this.api_user_info, {
        method: 'GET',
        headers: { Accept: 'application/json', 'TC-Token': this.token, Connection: 'Keep-Alive', 'Accept-Encoding': 'gzip' }
      }).then(r => r.json()).then((json) => {
        if (json.user_id) {
          this.fetchRegisteredUsers(json.user_id)

        }
      })
    }

    fetchRegisteredUsers(userid) {
      let arrUser = []
      if (this.token) {
        const api_registered_users = this.api_registered_users
        const max_size = 200
        const offset = 0
        const params = {
          offset: offset,
          limit: max_size,
          compact: 0
        }
        let tempBody = ''
        for (const property in params) {
          if (params.hasOwnProperty(property)) {
            tempBody += `${property}=${params[property]}&`
          }
        }
        fetch(api_registered_users + '?' + tempBody, {
          method: 'GET',
          headers: { Accept: 'application/json', 'TC-Token': this.token, Connection: 'Keep-Alive', 'Accept-Encoding': 'gzip' }
        }).then((response) => {
          if (response && [404, 401].indexOf(response.status) !== -1) {
            return {}
          } else {
            try { return response.json()
            } catch(e) { return {} }
          }
        })
        .then((json) => {
          if (json && json.items && json.items.constructor === Array && json.items.length > 0) {
            let arrUserTmp = json.items.filter(u => u.Id.toString() != userid.toString())
            this.setState({arrUser: arrUserTmp, arrUserOrigin: arrUserTmp})

          }
        })
      }
    }

    _onCancel() {
      this.props.onCancel()
    }

    _onSwipe() {}

    _onToggleMenu() {}

    _renderMenuExpandToggle() {}

    inviteFriends(userId) {
      let arrUser = JSON.parse(JSON.stringify(this.state.arrUser)) || []
      if (userId) {
        for (let i in arrUser) {
          if (arrUser[i] && (arrUser[i]["Id"].toString() == userId.toString())) {
            arrUser[i]['disable'] = true
          }
        }
      }
      this.setState({arrUser: arrUser}, async () => {
        try {
          if (Platform.OS == 'android') {
            let result = await InviteFriend.inviteFriends({userId: userId.toString()})
          } else {
            let result = await InviteFriend.inviteFriends(userId)
          }
        } catch(e) {
          await InviteFriend.inviteFriends(userId)
        }
      })
    }

    subString(str, pos) {
      pos = pos || 33
      let result = ''
      if (str && typeof (str) === 'string' && str.length > pos) {
        result = str.substr(0, pos) + ' ...'
      } else {
        result = str
      }

      return result
    }

    fullNameAvatar(fullname) {
      fullname = this.rxChangeSlug(fullname)
      let result = ''
      try {
        if (fullname.indexOf(' ') != -1) {
          let arrName = fullname.split(' ')
          if (arrName.length > 0) {
            result = (arrName[0].slice(0,1) + arrName[1].slice(0,1)).toUpperCase()
          } else {
            result = arrName[0].slice(0,2).toUpperCase()
          }
        } else {
          result = fullname.slice(0,2).toUpperCase()
        }
      } catch(e) {}

      return result
    }

    rxChangeSlug(x, isNotNull = false) {
      let str = x
      if (typeof (x) !== 'undefined') {
        str = str.toLowerCase()
        str = str.replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[\]\\/]/gi, '')
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        str = str.replace(/đ/g, 'd')
        str = str.replace(/ + /g, ' ')
        str = str.replace(/ /g, '-')
        str = str.trim()
      }
      return isNotNull ? (str || x) : str
    }

    handleSearch(text) {
      let arrUser = this.state.arrUser || []
      let arrData = []
      let formattedQuery = text.toLowerCase();
      for (let i = 0; i < arrUser.length; i++) {
        if (arrUser[i] && arrUser[i]['full_name'] && this.rxChangeSlug(arrUser[i]['full_name']).indexOf(this.rxChangeSlug(formattedQuery)) !== -1 ) {
          arrData.push(arrUser[i])
        }
      }
      if (!text) {
        text = ''
        arrData = this.state.arrUserOrigin
      }
      this.setState({query: text, arrUser: arrData})
    }

    renderHeader() {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'stretch',
            textAlign: 'center'
          }}
        >
          <TextInput
            caretHidden={false}
            clearButtonMode="always"
            value={this.state.query || ''}
            onChangeText={queryText => this.handleSearch(queryText)}
            placeholder={this.props.t('dialog.findContact')}
            placeholderTextColor="#000"
            style={{ backgroundColor: '#f7f7f7', paddingHorizontal: 20, textAlign: 'center', flex: 1, borderRadius: 20, height: 44, alignItems: 'stretch', color: '#000' }}
          />
        </View>
      );
    }

    render() {
        const { _bottomSheetStyles, _width, t } = this.props;
        const { showMore, arrUser } = this.state;
        const toolbarButtons = getMovableButtons(_width);

        const windowHeight = Dimensions.get('window').height;

        const buttonProps = {
            afterClick: this._onCancel,
            showLabel: true,
            styles: _bottomSheetStyles.buttons
        };

        const contentFlatList = {
          ...styles.container,
          height: Math.floor(windowHeight - 100)
        }

        const moreOptionsButtonProps = {
            ...buttonProps,
            afterClick: this._onToggleMenu,
            visible: !showMore
        };



        return (
            <View
              onCancel = { this._onCancel }
              onSwipe = { this._onSwipe }
              renderHeader = { this._renderMenuExpandToggle }>

              <View style={contentFlatList}>
                <View style={styles.headerContact}>
                  <View style={styles.leftContainer}>
                  </View>
                  <Text style={styles.text}>{'  '+t('dialog.addMember')+'  '}</Text>
                  <TouchableOpacity
                      onPress = { this._onCancel }
                      style = { styles.closeWrapper }>
                      <Icon
                          src = { IconCloseInviteList }
                          style = { styles.closeStyle } />
                  </TouchableOpacity>
                </View>
                <SafeAreaView style={styles.listContact}>
                  <FlatList
                    ListHeaderComponent={this.renderHeader}
                    data={arrUser}
                    keyExtractor={item => item.Id}
                    renderItem={({ item }) => (
                      <View style={styles.listItem}>
                        <View style={styles.containerAvatar}>
                          {item.profile_url && <Image
                            source={{ uri: this.cdn_endpoint + item.profile_url }}
                            style={styles.avatarStyle}
                          />}
                          {!item.profile_url && <View style={styles.avatarStyle}>
                            <Text style={styles.avatarText}>{this.fullNameAvatar(item.full_name || item.phone)}</Text>
                          </View>}
                        </View>
                        <View style={styles.containerFullName}>
                          <View style={styles.metaInfo}>
                            <Text style={styles.title}>{this.subString(`${item.full_name || item.phone}`, 20)}</Text>
                          </View>
                          <View style={styles.btnInvite}>
                            <TouchableOpacity style={(item.disable) ? styles.buttonInviteDisable : styles.buttonInvite} onPress={ () => {(!item.disable) ? this.inviteFriends(item.Id) : console.log()}}>
                              <Text style={(item.disable) ? styles.btnInviteTextDisable : styles.btnInviteText}> {t('dialog.invite')} </Text>
                            </TouchableOpacity>
                          </View>

                        </View>
                      </View>
                    )}
                  />
                </SafeAreaView>
              </View>
            </View>
        );
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    return {
        _bottomSheetStyles: ColorSchemeRegistry.get(state, 'BottomSheet'),
        _isOpen: isDialogOpen(state, FriendList_),
        _width: state['features/base/responsive-ui'].clientWidth
    };
}

FriendList_ = connect(_mapStateToProps)(FriendList);

export default translate(FriendList_);
