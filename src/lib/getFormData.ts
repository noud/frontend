import _ from 'lodash';

export default function(data = {}) {
  const formData = _.cloneDeep(data);

  Object.entries(formData).forEach(([key, value]) => {
    if (typeof value === 'object') {
      formData[key + 'Id'] = value.id;
    } else if (Array.isArray(value)) {
      formData[key + 'Ids'] = value.map((v) => v.id);
    }
  });

  return formData;
}
