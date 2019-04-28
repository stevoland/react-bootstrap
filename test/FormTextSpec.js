import React from 'react';
import { mount } from 'enzyme';

import FormText from '../src/FormText';

describe('<FormText>', () => {
  it('should render correctly', () => {
    expect(
      mount(
        <FormText id="foo" className="my-form-text">
          Help contents
        </FormText>,
      )
        .assertSingle('#foo.form-text.my-form-text')
        .text(),
    ).to.equal('Help contents');
  });

  it('Should define default "as" in prop destructuring instead of deafultProps', () => {
    expect(FormText.defaultProps.as).to.be.undefined;
  });

  it('Should have small as default component', () => {
    mount(<FormText />).assertSingle('small');
  });
});
