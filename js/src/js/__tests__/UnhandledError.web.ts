// @leosingleton/commonlibs - Common Libraries for TypeScript and .NET Core
// Copyright (c) Leo C. Singleton IV <leo@leosingleton.com>
// See LICENSE in the project root for license information.

import { UnhandledError, ErrorType } from '../UnhandledError';
import { AsyncManualResetEvent } from '../../coordination/AsyncManualResetEvent';

describe('UnhandledError', () => {

  it('Registers and invokes a handler', async () => {
    const received = new AsyncManualResetEvent();
    let err: UnhandledError;

    // Register a handler
    UnhandledError.registerHandler((ue: UnhandledError) => {
      err = ue;
      received.setEvent();
    });

    // Send an error
    UnhandledError.reportError(new Error('Test'));

    // Wait for the callback
    await received.waitAsync();

    expect(err.errorMessage).toBe('Test');
    expect(err.errorType).toBe(ErrorType.ReportedError);
    expect(err.errorStack).toBeDefined();
  });

});
