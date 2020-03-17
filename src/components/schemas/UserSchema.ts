import SimpleSchema from 'simpl-schema';
import HiddenField from '../../lib/HiddenField';

export default new SimpleSchema({
  id: {
    type: SimpleSchema.Integer,
    optional: true,
    // uniforms: HiddenField,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});
