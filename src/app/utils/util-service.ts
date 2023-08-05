import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import appRoot from 'app-root-path';
import validator from 'validator';

export enum HTTPStatus {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  OK = 200,
  CREATED = 201,
  INTERNAL_SERVER_ERROR = 500,
  VALIDATION_ERROR = 422,
  UNAUTHORIZED_ERROR = 401,
  PERMISSION_ERROR = 403
}

class UtilityService {
  fileOrDirectoryExists(fullPath: string) {
    try {
      fs.accessSync(fullPath, fs.constants.F_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  getFullPathFromRoot(path01: string) {
    const cwd = process.cwd();
    const rootFiles = [
      //
      'package.json'
    ];
    const anyExists = rootFiles.some((fileName) => this.fileOrDirectoryExists(path.resolve(cwd, fileName)));
    if (anyExists) {
      return path.resolve(cwd, path01);
    }
    return path.resolve(appRoot.path, path01);
  }

  isUUID(str: string) {
    return validator.isUUID(str);
  }

  isValidEmail(email: string) {
    try {
      return validator.isEmail(email);
    } catch (error) {
      return false;
    }
  }

//   getRandomString(count: number) {
//     const alphabets = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     const nanoid01 = customAlphabet(alphabets, count);
//     return nanoid01();
//   }

//   getShortId() {
//     return this.getRandomString(8);
//   }

  getUUID() {
    return uuidv4();
  }
}

export const UtilService = new UtilityService();
