package org.jitsi.meet.sdk;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import org.jitsi.meet.sdk.log.JitsiMeetLogger;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = InviteFriendModule.NAME)
public class InviteFriendModule extends ReactContextBaseJavaModule {

    private final BroadcastEmitter broadcastEmitter;
    public static final String NAME = "InviteFriend";

    public interface InviteEventHandler {
        void invitedFriendTest(Double invitedUin);
    }

    private InviteEventHandler mInviteEventHandler;

    @Override
    public String getName() {
        return NAME;  // Name of the Native Modules.
    }

    public InviteFriendModule(ReactApplicationContext reactContext) {
        super(reactContext);

        broadcastEmitter = new BroadcastEmitter(reactContext);
    }

    @ReactMethod
    public void initInviteFriendModule(InviteEventHandler inviteEventHandler) {
        this.mInviteEventHandler = inviteEventHandler;
    }

    @ReactMethod
    public void inviteFriends(ReadableMap invitedUin) {
        try {
             JitsiMeetLogger.e("invitedUin: " + invitedUin);
            broadcastEmitter.sendBroadcast("INVITE_FRIEND_CHANGED", invitedUin);
        } catch (Exception e) {
        }
    }
}
