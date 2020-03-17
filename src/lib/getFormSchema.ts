import SimpleSchema from 'simpl-schema';

export default function getFormSchema(simpleSchema: SimpleSchema): [] {
  Object.entries(simpleSchema._schema).forEach(([name, field]): void => {
    if (field.relationshipType === 'belongsTo') {
      simpleSchema = simpleSchema.omit(name);

      simpleSchema.extend({
        [name + 'Id']: field,
      });
    }
  });

  return simpleSchema;
}
