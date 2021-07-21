import { mount } from 'enzyme';

import Badge from '../src/Badge';

describe('Badge', () => {
  it('Should render correctly', () => {
    expect(
      mount(
        <Badge bg="primary" pill>
          Message
        </Badge>,
      )
        .assertSingle('span.badge.bg-primary.rounded-pill')
        .text(),
    ).to.equal('Message');
  });

  it('should support custom `as`', () => {
    mount(
      <Badge as="a" href="#" bg="primary" pill>
        Message
      </Badge>,
    ).assertSingle('a[href="#"]');
  });

  it('Should default to variant="primary"', () => {
    mount(<Badge>Message</Badge>).assertSingle(`.badge-primary`);
  });

  it('Should use variant class', () => {
    mount(<Badge variant="danger">Message</Badge>).assertSingle(
      '.badge-danger',
    );
  });

  it('Should not have variant class when variant=null', () => {
    const wrapper = mount(<Badge variant={null}>Message</Badge>);
    expect(wrapper.find('.badge-primary').length).to.equal(0);
  });
});
