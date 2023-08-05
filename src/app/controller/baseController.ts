import { Response } from 'express';
import { injectable } from 'inversify';
// import { LoggingService } from '../utils/logging-service';
// import { UtilService } from '../utils/util-services';
import { FriendlyErrorUtil } from '../utils/errors';
import Joi from 'joi';
import { SchemaValidatorService } from '../utils/schema-validator-service';
// import { ISessionUserInfo } from '../types/common';

@injectable()
export abstract class BaseController extends FriendlyErrorUtil {
//   static readonly HEADER_KEY = 'user';
//   private readonly REQUEST_DATA_KEY = 'REQUEST_DATA_01';

  protected async joiSchemaValidate<T = any>({
    schemaDef,
    dataInput,
    allowUnknown,
    stripUnknown
  }: {
    schemaDef: Joi.PartialSchemaMap<any>;
    dataInput: Record<string, any>;
    allowUnknown?: boolean;
    stripUnknown?: boolean;
  }) {
    const { validatedData } = await SchemaValidatorService.joiSchemaValidate({
      schemaDef,
      data: dataInput,
      canThrowTheError: true,
      allowUnknown: allowUnknown ?? false,
      stripUnknown: stripUnknown ?? true
    });
    return validatedData as T;
  }

  // protected async getCurrentUserInfo({ req }: { req: Request }) {
  //   const data = this.decodeHeaderData(req);
  //   if (data?.id) {
  //     return Promise.resolve(data);
  //   }
  //   return null;
  // }

//   private decodeHeaderData(req: Request) {
//     const REQUEST_KEY = this.REQUEST_DATA_KEY;
//     const HEADER_KEY = BaseController.HEADER_KEY;
//     //
//     const cachedDataStr: string | undefined = (req as any)[REQUEST_KEY];
//     if (cachedDataStr) {
//       try {
//         const cachedData: ISessionUserInfo = JSON.parse(cachedDataStr);
//         if (cachedData?.id) {
//           // console.log({ cachedData });
//           return cachedData;
//         }
//       } catch (error) {
//         //
//       }
//     }
//     let data: ISessionUserInfo | null = null;
//     try {
//       const headerVal = this.getOneHeaderByKey(req, HEADER_KEY);
//       if (!headerVal) {
//         return null;
//       }
//       data = JSON.parse(headerVal);
//       if (data?.id) {
//         (req as any)[REQUEST_KEY] = headerVal;
//         return data;
//       }
//       return null;
//     } catch (error) {
//       data = null;
//     }
//     return data;
//   }

  protected success({
    res,
    data,
    message = '',
    httpStatus = 200
  }: {
    res: Response;
    data: any;
    message?: string;
    httpStatus?: number;
  }) {
    return res.status(httpStatus).json({
      status: 'success',
      message: message,
      data: data
    });
  }

  protected error({
    res,
    code,
    message,
    error,
    httpStatus = 400
  }: {
    res: Response;
    code?: string;
    message?: string;
    error?: any;
    httpStatus?: number;
  }) {
    const errorData = this.getFriendlyErrorMessage(error);

    if (error) {
      // LoggingService.error(error);
      console.log(error); 
    }

    if (message) {
      // LoggingService.error(message);
      console.log(message);
    }

    const httpStatus01 = errorData.httpStatus || httpStatus || 500;
    const message01 = message || errorData.message || 'Error occurred';
    const code01 = errorData.code || code || 0;
    return res.status(httpStatus01).send({
      status: 'error',
      code: code01,
      message: message01
    });
  }

  protected getBooleanValue(val: unknown): boolean | null {
    if (val !== undefined && val !== null) {
      if (typeof val === 'string' || typeof val === 'boolean') {
        if (String(val).trim() === 'true' || String(val).trim() === 'false') {
          return JSON.parse(`${val}`.trim()) === true;
        }
      }
    }
    return null;
  }

  protected getNumberValue(val: unknown): number | null {
    if (val !== undefined && val !== null) {
      if (typeof val === 'string' || typeof val === 'number') {
        if (!isNaN(Number(val))) {
          return Number(val);
        }
      }
    }
    return null;
  }
}
