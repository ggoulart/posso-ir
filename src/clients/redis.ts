import asyncRedis from "async-redis"

export class redisClient {

  private readonly client

  constructor(redisURL: string) {
    this.client = asyncRedis.createClient(redisURL, {
      tls: { rejectUnauthorized: false },
    })
  }

  public async getEurToBrl(): Promise<void> {
    //
  }
}