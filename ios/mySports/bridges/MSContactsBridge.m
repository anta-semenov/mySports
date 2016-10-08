//
//  ContactsBridge.m
//  mySports
//
//  Created by Anton on 07/10/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MSContacts, NSObject)

RCT_EXTERN_METHOD(getOwnContact:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)

RCT_EXTERN_METHOD()

@end
