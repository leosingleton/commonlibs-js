// @leosingleton/commonlibs - Common Libraries for TypeScript and .NET Core
// Copyright (c) Leo C. Singleton IV <leo@leosingleton.com>
// See LICENSE in the project root for license information.

import { AsyncEventWaitHandle } from './AsyncEventWaitHandle';

/** Async version of .NET's `System.Threading.ManualResetEvent` */
export class AsyncManualResetEvent extends AsyncEventWaitHandle {
  public constructor(initialState = false) {
    super(false, initialState);
  }
}
