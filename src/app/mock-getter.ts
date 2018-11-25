export const mockGetter = <T, K extends keyof T>(object: T | jest.Mocked<T>, property: K, value: T[K]) => {
  Object.defineProperty(object, property, { get: () => value });
};
