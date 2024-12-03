import { Program, Client, LoginCredentials, CreateProgramData, Exercise, Trainer, NewClient } from '@/lib/types';

const API_BASE_URL = 'https://swafe24fitness.azurewebsites.net/api';

export class FitnessAPI {
  public static getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  static setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', token);
    }
  }

  static clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
    }
  }

  private static async fetch(endpoint: string, options: RequestInit = {}) {
    const token = this.getStoredToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken(); // Clear invalid token
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    // Return null for 204 No Content
    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  // Auth
  static async login(credentials: LoginCredentials) {
    const response = await this.fetch('/Users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.jwt) {
      this.setToken(response.jwt);
    }

    return response;
  }

  // Clients
  static async getClients(): Promise<Client[]> {
    return this.fetch('/Users/Clients');
  }

  // Programs
  static async getTrainerPrograms(): Promise<Program[]> {
    return this.fetch('/WorkoutPrograms/trainer');
  }

  static async createProgram(data: CreateProgramData): Promise<Program> {
    return this.fetch('/WorkoutPrograms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getProgramById(id: string): Promise<Program> {
    return this.fetch(`/WorkoutPrograms/${id}`);
  }

  // New function to get client programs
  static async getClientPrograms(): Promise<Program[]> {
    return this.fetch('/WorkoutPrograms');
  }

  static isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }
  // Get exercises for a programId
  static async addExerciseToProgram(programId: string, exerciseData: Partial<Exercise>) {
    return this.fetch(`/Exercises/Program/${programId}`, {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
  }

  // Get unassigned exercises
  static async getUnassignedExercises(): Promise<Exercise[]> {
    return this.fetch('/Exercises/unassigned');
  }

  static async getAllExercises(): Promise<Exercise[]> {
    return this.fetch('/Exercises');
  }


    static async removeExercise(exerciseId: number): Promise<void> {
    try {
        // Ensure we're passing a valid number
        const id = parseInt(exerciseId.toString(), 10);
        if (isNaN(id)) {
            throw new Error('Invalid exercise ID');
        }

        const response = await fetch(`${API_BASE_URL}/Exercises/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.getStoredToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete exercise: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error in removeExercise:', error);
        throw error;
    }
  }


  // get trainers fetch with method and headers
  static async getTrainers(): Promise<Trainer[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/Users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getStoredToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch trainers');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trainers:', error);
      throw error;
    }
  }


  // trainers create POST:
  static async createTrainer(data: Trainer): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getStoredToken()}`
        },
        body: JSON.stringify({ ...data, accountType: 'PersonalTrainer' }),
      });

      if (!response.ok) {
        throw new Error('Failed to create trainer');
      }

    } catch (error) {
      console.error('Error creating trainer:', error);
      throw error;
    }
  };

  static async createNewClient(data: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalTrainerId: string;
    accountType: string;
  }): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getStoredToken()}`
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create client');
      }
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  }
  
  static getUserIdFromToken(): number | null {
    const token = this.getStoredToken();
    if (!token) return null;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return parseInt(decodedToken.UserId, 10);
  }

};