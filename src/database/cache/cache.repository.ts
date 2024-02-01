import { Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { ICacheRepository } from "./cache.repository.interface";


export type RedisConfig = {
  host: string;
  port?: string;
  password?: string;
  timeout?: string;
  maxRetries?: string;
};

/* eslint-disable @typescript-eslint/no-empty-interface */
@Injectable()
export class CacheRepository implements ICacheRepository {
  private static _client: Redis;

  public static connect(config: RedisConfig): void {
    if (CacheRepository._client) {
      console.log('RedisCacheRepository already connected');
      return;
    }

    try {
      CacheRepository._client = new Redis({
        host: config.host,
        port: parseInt(config.port ?? '6379'),
        password: config.password,
        commandTimeout: parseInt(config.timeout ?? '3000'),
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        reconnectOnError: (err) => {
          const targetError = 'READONLY';
          return err.message.includes(targetError);
        },
        maxRetriesPerRequest: parseInt(config.maxRetries ?? '1')
      });

      console.log('RedisCacheRepository connected');
    } catch (err) {
      throw err;
    }
  }

  public static disconnect(): void {
    if (CacheRepository._client) {
      CacheRepository._client?.disconnect();
    }
  }

  async save<T>(key: string, data: T, ttl?: number): Promise<T>{
     try {
      CacheRepository.validateConnection();

      const valueStr = JSON.stringify(data);
      ttl
        ? await CacheRepository._client?.set(key, valueStr, 'EX', ttl)
        : await CacheRepository._client?.set(key, valueStr);

      return data;
    } catch (err) {
      throw err;
    }
  }

  async recoveryOrSave<T>(key: string, fn: () => Promise<{ value: T, ttl?: number }>, ttl?: number): Promise<T>{
    const cachedValue = await this.get<T>(key);
    
    if (cachedValue) return cachedValue;

    const { ttl: custom_ttl, value } = await fn();

    return await this.save<T>(key, value, custom_ttl ?? ttl);
  }

  async get<T>(key: string): Promise<T | undefined>{
    try {
      CacheRepository.validateConnection();
      const valueStr = await CacheRepository._client?.get(key);
      if (valueStr) return JSON.parse(valueStr) as T;
    } catch (err) {
      throw err;
    }
  }

  async delete(key: string): Promise<void>{
    try {
      CacheRepository.validateConnection();
      await CacheRepository._client?.del(key);
    } catch (err) {
      throw err;
    }
  }

  private static validateConnection(): void {
    switch (CacheRepository._client?.status) {
      case 'close':
        throw new Error('RedisCacheRepository is close');
      case 'end':
        throw new Error('RedisCacheRepository is end');
      case 'wait':
        throw new Error('RedisCacheRepository is wait');
      default:
        break;
    }
  }
}
