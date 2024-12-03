export type Exercise = {
    exerciseId: number;
    groupId: string;
    name: string;
    description: string;
    sets: number;
    repetitions: number;
    time: string;
    workoutProgramId: number;
    personalTrainerId: number;
  };
  
  export type Program = {
    workoutProgramId: number;  
    groupId: string;
    name: string;
    description: string;
    exercises: Exercise[];
    personalTrainerId: number;
    clientId: number;
  };
  
  export type Client = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    accountType: string;
    personalTrainerId?: string;
  };
  
  export type LoginCredentials = {
    email: string;
    password: string;
  };
  
  export type CreateProgramData = {
    name: string;
    clientId: number; 
    description: string;
  };
  
  export type User = {
    jwt: string;
    accountType?: string;
  };

  export type Trainer = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    personalTrainerId: number;
    accountType: 'personalTrainer';
  };

  export type NewClient = {
      userId: number;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      personalTrainerId: number;
      accountType: 'Client';
    };

    

