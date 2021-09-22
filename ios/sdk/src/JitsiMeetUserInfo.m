/*
 * Copyright @ 2019-present 8x8, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#import "JitsiMeetUserInfo+Private.h"

@implementation JitsiMeetUserInfo

- (instancetype)initWithDisplayName:(NSString *_Nullable)displayName
                           andEmail:(NSString *_Nullable)email
                          andAvatar:(NSURL *_Nullable) avatar
                          naToken:(NSString *_Nullable) token
                          naCDNEndpoint:(NSURL *_Nullable) cdn
                          naAPIEndpoint:(NSURL *_Nullable) api {
    self = [super init];
    if (self) {
        self.displayName = displayName;
        self.email = email;
        self.avatar = avatar;
        self.naToken = token;
        self.naCDNEndpoint = cdn;
        self.naAPIEndpoint = api;
    }

    return self;
}

- (NSDictionary *)asDict {
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];

    if (self.displayName != nil) {
        dict[@"displayName"] = self.displayName;
    }

    if (self.email != nil) {
        dict[@"email"] = self.email;
    }

    if (self.avatar != nil) {
        NSString *avatarURL = [self.avatar absoluteString];
        if (avatarURL != nil) {
            dict[@"avatarURL"] = avatarURL;
        }
    }
    
    if (self.naToken != nil) {
        dict[@"tokenNetalo"] = self.naToken;
    }
    
    if (self.naCDNEndpoint != nil) {
        NSString *url = [self.naCDNEndpoint absoluteString];
        if (url != nil) {
            dict[@"cdnEndpoint"] = url;
        }
    }
    
    if (self.naAPIEndpoint != nil) {
        NSString *url = [self.naAPIEndpoint absoluteString];
        if (url != nil) {
            dict[@"apiEndpoint"] = url;
        }
    }

    return dict;
}

@end
