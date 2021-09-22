
#import "RCTInviteFriend.h"
#import "JitsiMeet+Private.h"
#import "JitsiMeetView+Private.h"

@interface RCTInviteFriend()

@end

@implementation RCTInviteFriend

- (instancetype)init {
    self = [super init];
    if (self) {
        
    }
    
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(inviteFriends: (NSString *) userId)
{
    NSMutableDictionary *props = [[NSMutableDictionary alloc] init];
    props[@"userId"] = userId;
    [JitsiMeetView inviteFriend:props];
}

@end
  
