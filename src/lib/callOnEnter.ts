export default (callback: Function) => {
  return (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      callback();
    }
  };
};
