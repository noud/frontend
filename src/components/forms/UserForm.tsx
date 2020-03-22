import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { AutoForm, ErrorsField, SubmitField } from 'uniforms-material';
import 'uniforms-bridge-simple-schema-2'; // prevent Uncaught Invariant Violation
import SimpleCard from '../SimpleCard/SimpleCard';
import AutoFormField from '../EntityForm/AutoFormField';

import Schema from '../schemas/UserSchema';

import { useGetUserQuery } from '../../graphql';

import { getFormSchema, getFormData, getOptionsFromRelationship } from '../../lib';

// const formSchema = getFormSchema(Schema);
const formSchema = Schema;

function UserForm(props: any) {
  const { data, type = 'insert', handleSubmit } = props;

  const { data: associatedData } = useGetUserQuery({
    variables: {
      id: data && data.id ? data.id : 0,
    },
  });

  const formData = getFormData(data);

  return associatedData ? (
    <SimpleCard
      heading={'User ' + type}
      arrowBack={{link: '/user',}}
    >
      <AutoForm id="userForm" schema={formSchema} model={formData} onSubmit={(doc: any) => handleSubmit({ variables: doc })}>
        {formSchema.objectKeys('').map((key: string) => {
          const field: object = formSchema.getDefinition(key);
          return (<AutoFormField key={key} name={key} field={field} />);
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
