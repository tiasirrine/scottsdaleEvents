import React, { Fragment } from 'react';
import { Input, Select, SelectInput, SelectOptions, SelectOption } from 'mdbreact';

class SelectPage extends React.Component {
  getSelectValue = value => {
    console.log(value);
  };

  render() {
    return (
      <Fragment>
        <Select getValue={this.getSelectValue} color="primary">
          <SelectInput />
          <SelectOptions>
            <SelectOption disabled>Choose your option</SelectOption>
            <SelectOption>Option nr 1</SelectOption>
            <SelectOption>Option nr 2</SelectOption>
            <SelectOption>Option nr 3</SelectOption>
            <SelectOption>Option nr 4</SelectOption>
            <SelectOption>Option nr 5</SelectOption>
          </SelectOptions>
        </Select>
        <label>Blue select</label>{' '}
        <label>
          Current:
          {'   '}
        </label>
        <Input data-id={a.id} onChange={this.onChange} name={a.name} value={activeCart[i].qty}>
          {this.createSelectItems()}
        </Input>
      </Fragment>
    );
  }
}

export default SelectPage;
