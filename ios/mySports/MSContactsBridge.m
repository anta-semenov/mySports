//
//  MSContactsBridge.m
//  mySports
//
//  Created by Anton on 08/10/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MSContacts, NSObject)

RCT_EXTERN_METHOD(getOwnContact:(RCTPromiseResolveBlock *)resolve rejecter:(RCTPromiseRejectBlock *)reject)

@end
