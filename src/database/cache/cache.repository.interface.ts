/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ICacheRepository {
  save: <T>(key: string, data: T, ttl?: number) => Promise<T>;
  recoveryOrSave: <T>(key: string, fn: () => Promise<{ value: T, ttl?: number }>, ttl?: number) => Promise<T>;
  get: <T>(key: string) => Promise<T | undefined>;
  delete: (key: string) => Promise<void>;
}
