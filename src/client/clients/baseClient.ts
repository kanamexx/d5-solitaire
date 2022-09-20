import axios, { AxiosInstance } from "axios";

class BaseClient {
  private readonly _httpClient: AxiosInstance;

  protected constructor() {
    this._httpClient = axios.create({
      baseURL: "",
    });
    this._httpClient.get;
  }

  protected static of(): BaseClient {
    return new BaseClient();
  }

  public get = async <T>(url: string): Promise<T> => {
    return (await this._httpClient.get(url)).data as T;
  };
}

export default BaseClient;
