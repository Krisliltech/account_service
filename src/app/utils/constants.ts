export const DefinedTableNames = {
    USER: 'users'
};

type IDefinedTableNames = typeof DefinedTableNames;

export const DefinedSchemaNames = {
  ACCOUNT_SERVICE: 'account_service'
};

export const MIGRATION_TABLE_NAME = 'account_service_migrations';

function addPath(): IDefinedTableNames {
  const obj = {} as any;
  Object.entries({ ...DefinedTableNames }).forEach(([key, value]) => {
    obj[key] = `${DefinedSchemaNames.ACCOUNT_SERVICE}.${value}`;
  });
  return obj;
}

export const DefinedTableNamesPath = addPath();
  