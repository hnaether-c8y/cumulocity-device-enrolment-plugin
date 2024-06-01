import { Injectable } from '@angular/core';
import {
  FetchClient,
} from '@c8y/client';

interface RegistrationResponse {
  docker: string;
  device: string;
  token: string;
}

@Injectable()
export class AssetPropertiesViewService {
  constructor(
    private c8yApi: FetchClient,
  ) {}

  async getRegistrationCode(name: string) {
    let response = await this.c8yApi.fetch(`/service/c8y-token-syner/token`, {
      method: "GET",
      params: {
        externalId: name
      },
    })
    const data = await response.json();
    return data;
  }
}
