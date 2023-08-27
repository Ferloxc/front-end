import { ErrorHandler, Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private environment: string = "Local"
  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;
  private API_URL: string = 'http://138.91.105.71/api_v1/';
  // private API_URL: string  = "localhost/api_v1/";

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getUserToken(),
      },
    });
  }

  // Configuracion para consumir el API
  private async get(url: string, params?: object): Promise<any> {
    const response = await this.axiosClient.get(this.API_URL + url, {
      params: params,
    });
    if (response) {
      return response.data;
    } else {
      return {};
    }
  }

  private async post(
    url: string,
    payload: object,
    params?: object
  ): Promise<any> {
    const response = await this.axiosClient.post(this.API_URL + url, payload, {
      params: params,
    });
    if (response) {
      return response.data;
    } else {
      return {};
    }
  }

  private async put(
    url: string,
    payload: object,
    params?: object
  ): Promise<any> {
    const response = await this.axiosClient.put(this.API_URL + url, payload, {
      params: params,
    });
    if (response) {
      return response.data;
    } else {
      return {};
    }
  }

  private async delete(url: string, params?: object): Promise<any> {
    const response = await this.axiosClient.delete(this.API_URL + url, {
      params: params,
    });
    if (response) {
      return response.data;
    } else {
      return {};
    }
  }

  private getUserToken(): string {
    let user = JSON.parse(localStorage.getItem('user')!);
    console.log('getUserToken', user);

    return user?.stsTokenManager?.accessToken;
  }

  // Users
  getUser(idUser: string): Promise<any> {
    return this.get(`users/${idUser}`);
  }

  createUser(payload: object): Promise<any> {
    return this.post(`users`, payload);
  }

  updateUser(payload: object): Promise<any> {
    return this.put(`users`, payload);
  }

  deleteUser(idUser: string): Promise<any> {
    return this.get(`users/${idUser}`);
  }

  findUserById(idUser: string): Promise<any> {
    return this.get(`users/${idUser}`);
  }

  findObjectById(idUser: any): Promise<any> {
    return this.get(`users/${idUser}`);
  }

  // Projects
  createProject(payload: object): Promise<any> {
    return this.post('projects/', payload);
  }

  updateProject(payload: object): Promise<any> {
    return this.put('projects/', payload);
  }

  deleteProject(userId: string, projectId: string): Promise<any> {
    return this.delete(`projects/${userId}/${projectId}`);
  }

  getUserProjects(userId: string): Promise<any> {
    return this.get(`projects/${userId}`);
  }
}
