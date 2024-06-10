/**
 * Try to run a function, and return a default value if it throws an error
 * @template T - The return type of the function
 * @param fn - A function to try
 * @param defaultValue - A default value to return if the function throws an error
 * @returns {T} The result of the function or the default value
 */
export function tryOrDefault<T>(fn: () => T, defaultValue: T): T {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}
