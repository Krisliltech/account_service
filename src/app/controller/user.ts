// import { inject } from 'inversify';
import { controller, httpPost, queryParam } from 'inversify-express-utils';
import { BaseController } from './baseController';
import { Response, Request } from 'express';

@controller('/v1/maintenance')
export class UserAccountController extends BaseController {
  constructor(
    // @inject(TYPES.MaintenanceService)
    // private readonly maintenanceService: MaintenanceService
  ) {
    super();
  }

  @httpPost('/assign-tester')
  async assignTester(@queryParam('def__Assign_tester') def: string, req: Request, res: Response) {
    try {
    //   const data: AssignTesterDTORequest = req.body;

    //   const testerData = await this.joiSchemaValidate<AssignTesterDTORequest>({
    //     dataInput: data,
    //     schemaDef: AssignVehicleToTesterSchema
    //   });

    //   const result = await this.maintenanceService.assignTester(testerData);
    //   return this.success({ res, data: result.data, message: result.message, httpStatus: result.httpStatus });
    } catch (error) {
    //   return this.error({ error, res });
    }
  }
}
