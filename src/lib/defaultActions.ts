const defaultActions = {
  view(entityName: string, entityId: number, params: any) {
    const { history } = params;
    history.push('/' + entityName + '/' + entityId);
  },
  edit(entityName: string, entityId: number, params: any) {
    const { history } = params;
    history.push('/' + entityName + '/' + entityId + '/edit');
  },
  delete(entityName: string, entityId: number, params: any) {
    params.actions.remove({ id: entityId });
  },
};

export default defaultActions;
