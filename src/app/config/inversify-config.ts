import { Container } from 'inversify';
import { UserAccountController } from '../controller/user';
import { PostgresConnection } from './db';
import TYPES from './types';

const container = new Container();

// controllers
container.bind<UserAccountController>(TYPES.UserAccountController).to(UserAccountController).inSingletonScope();

// services
// container.bind<ReportingService>(TYPES.ReportingService).to(ReportingService).inSingletonScope();

// repositories
// container.bind<UserAccountRepository>(TYPES.UserAccountRepository).to(UserAccountRepository).inSingletonScope();


// database
container.bind<PostgresConnection>(TYPES.DatabaseConnection).to(PostgresConnection).inSingletonScope();

export default container;

// export const vehicleTypeRepoApi = container.get<VehicleTypeRepository>(TYPES.VehicleTypeRepository);
