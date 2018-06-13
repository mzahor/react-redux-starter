export function setValue(propName, evt) {
  const { value } = evt.target;
  this.setState({
    [propName]: value
  });
}
