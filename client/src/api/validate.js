export function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email)) {
    return true;
  }
  return false;
}

export function checkNull(user) {
  const values = Object.values(user);
  return values.every(a => a != false);
}

export function handleInputChange(event) {
  const { value, name } = event.target;
  this.setState({ [name]: value });
}
