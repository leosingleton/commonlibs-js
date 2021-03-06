// @leosingleton/commonlibs - Common Libraries for TypeScript and .NET Core
// Copyright (c) Leo C. Singleton IV <leo@leosingleton.com>
// See LICENSE in the project root for license information.

/** C#-like pattern for objects that hold expensive resources that must be explicitly freed */
export interface IDisposable {
  /** Frees resources */
  dispose(): void;
}

/**
 * Helper function for C#-like using blocks
 * @param obj Object to dispose at the end of the lambda execution
 * @param lambda Lambda function to execute. The object is passed as a parameter to allow new objects to be created in
 *    a single line of code, i.e. `using(new MyObject(), obj => { /* Use obj * / });`
 */
export function using<T extends IDisposable>(obj: T, lambda: (obj: T) => void): void {
  try {
    lambda(obj);
  } finally {
    if (obj) {
      obj.dispose();
    }
  }
}

/**
 * Helper function for C#-like using blocks when using async code
 * @param obj Object to dispose at the end of the lambda execution
 * @param lambda Async lambda function to execute. The object is passed as a parameter to allow new objects to be
 *    created in a single line of code, i.e. `await usingAsync(new MyObject(), async obj => { /* Use obj * / });`
 */
export async function usingAsync<T extends IDisposable>(obj: T, lambda: (obj: T) => Promise<void>): Promise<void> {
  try {
    await lambda(obj);
  } finally {
    if (obj) {
      obj.dispose();
    }
  }
}

/**
 * Many objects in JavaScript have a disposable-like pattern, but there is no standard `dispose()` method nor
 * `IDisposable` interface. Some use `.close()`, while others use `.restore()`. This wrapper makes it easy to convert
 * existing objects, e.g. `makeDisposable(imageBitmap, obj => obj.close())`
 * @param obj Object to make IDisposable
 * @param dispose Lambda to execute to dispose the object
 */
export function makeDisposable<T>(obj: T, dispose: (obj: T) => void): T & IDisposable {
  const result = <T & IDisposable>obj;
  result.dispose = function(): void {
    if (obj) {
      dispose(obj);
    }
  };
  return result;
}
