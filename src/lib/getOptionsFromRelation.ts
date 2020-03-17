import pluralize from 'pluralize';

export default function getOptionsFromRelationship(entityName = '', allRelatedData: any) {
  const entityPlural: string = pluralize.plural(entityName);
  const entities = allRelatedData && allRelatedData[entityPlural] ? allRelatedData[entityPlural].data : [];
  const options: any[] = [];

  entities.forEach((entity: { id: number; displayField: any }) => {
    options.push({
      value: entity.id,
      label: entity.displayField,
    });
  });

  return options;
}
