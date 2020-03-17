import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { AutoForm, ErrorsField, SubmitField } from 'uniforms-material';
import SimpleCard from '../../SimpleCard/SimpleCard';
import AutoFormField from '../../EntityForm/AutoFormField';
import Schema from '../../schemas/UserSchema';
import { useGetUserQuery } from '../../../graphql';
import { getFormSchema, getFormData, getOptionsFromRelationship } from '../../../lib';

const formSchema = getFormSchema(Schema);

function UserForm(props: any) {
  const { data, type = 'insert', handleSubmit } = props;

  const { data: associatedData } = useGetUserQuery();

  const formData = getFormData(data);

  return associatedData ? (
    <SimpleCard
      heading={'User ' + type}
      arrowBack={{
        link: '/user',
      }}
    >
      This is my custom Form!
      <AutoForm id="userForm" schema={formSchema} model={formData} onSubmit={(doc: any) => handleSubmit({ variables: doc })}>
        {formSchema.objectKeys().map((key: string) => {
          const field: object = formSchema.getDefinition(key);

          return <AutoFormField key={key} name={key} field={field} options={getOptionsFromRelationship(field.relatedModel, associatedData)} />;
        })}
        <ErrorsField />
        <SubmitField />
      </AutoForm>
    </SimpleCard>
  ) : (
    <CircularProgress />
  );
}

export default UserForm;
