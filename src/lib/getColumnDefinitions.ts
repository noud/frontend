import SimpleSchema from 'simpl-schema';
import pluralize from 'pluralize';
import ActionButtons from '../components/EntityTable/CellRenderers/ActionButtons';
import BooleanRenderer from '../components/EntityTable/CellRenderers/BooleanRenderer';
import DefaultRenderer from '../components/EntityTable/CellRenderers/DefaultRenderer';

export default function getColumnDefinitions(simpleSchema: SimpleSchema): [] {
  const columnDefinitions: [] = [];

  simpleSchema.objectKeys().forEach((key: string): void => {
    const field: object = simpleSchema.getDefinition(key);

    // Do not render many fields.
    if (/\w+.\$$/.test(key)) {
      return;
    }

    const fieldTypes: [] = simpleSchema.get(key, 'type').map((type) => type.type.name);

    const Cell = fieldTypes.includes('Boolean') ? BooleanRenderer : DefaultRenderer;

    columnDefinitions.push({
      Header: fieldTypes.includes('Array') ? pluralize.plural(field.label) : field.label,
      accessor: fieldTypes.includes('Array') ? pluralize.plural(key) : key,
      Cell,
    });
  });

  columnDefinitions.push({
    Header: 'Actions',
    accessor: false,
    Cell: ActionButtons,
  });

  return columnDefinitions;
}
