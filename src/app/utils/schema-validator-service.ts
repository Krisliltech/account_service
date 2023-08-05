import Joi from 'joi';
import { GenericFriendlyError } from './errors';

function getJoiValidationErrors(err: Joi.ValidationError): string | null {
  if (err?.details?.length) {
    const details: Joi.ValidationErrorItem[] = JSON.parse(JSON.stringify(err.details));
    const joiData = details.map((x) => x.message.replace(new RegExp('"', 'g'), ''));
    return joiData.join('; ');
  }
  return '';
}

class SchemaValidatorServiceBase {
  async joiSchemaValidate<T = any>({
    schemaDef,
    data,
    errorMesssagePrefix,
    canThrowTheError,
    allowUnknown = true,
    stripUnknown
  }: {
    schemaDef: Joi.PartialSchemaMap<T>;
    data: Record<string, any>;
    errorMesssagePrefix?: string;
    canThrowTheError: boolean;
    allowUnknown?: boolean;
    stripUnknown?: boolean;
  }) {
    const schema = Joi.object().keys({ ...schemaDef });

    const { error, value } = schema.validate(data, {
      allowUnknown,
      skipFunctions: true,
      stripUnknown
    });

    if (error) {
      const msg = getJoiValidationErrors(error) || 'Validation error occured';
      const errorMesage = [errorMesssagePrefix, msg].filter((x) => x).join(': ');

      if (canThrowTheError) {
        throw GenericFriendlyError.createValidationError(errorMesage);
      }
      return await Promise.resolve({ validatedData: undefined, errorMesage });
    }
    return await Promise.resolve({ validatedData: value as T, errorMesage: undefined });
  }
}

export const SchemaValidatorService = new SchemaValidatorServiceBase();
