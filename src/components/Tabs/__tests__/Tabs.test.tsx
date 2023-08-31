//@ts-nocheck
import React from 'react';
import { render } from '../../../jest/render';
import { fireEvent } from '@testing-library/react-native';
import { Tabs } from '..';
import { TouchableOpacity } from 'react-native';

jest.useFakeTimers();
const mockFn = jest.fn();

describe('Tabs component', () => {
  it('resolves all default props', () => {
    const { toJSON, getByText } = render(
      <Tabs values={['Daily', 'Weekly', 'Monthly', 'Yearly']} />
    );
    const tabItem = getByText('Monthly');
    fireEvent.press(tabItem);
    expect(toJSON()).toMatchSnapshot();
  });
  it('Tabs component with custom colors tab data', () => {
    const { toJSON, getByText } = render(
      <>
        <Tabs
          values={['Issues', 'Pressure']}
          value={'Issues'}
          highlightTextColor="blue"
          inactiveTextColor="red"
          onSelect={mockFn}
          isScrollableTabs
        />
      </>
    );

    const tabItem = getByText('Pressure');
    fireEvent.press(tabItem);
    expect(toJSON()).toMatchSnapshot();
  });
  it('Tabs component with custom colors tab data with disable props', () => {
    const { toJSON, UNSAFE_getAllByType } = render(
      <>
        <Tabs
          values={['Issues', 'Pressure']}
          value={'Issues'}
          disableTabs={true}
        />
      </>
    );
    const onSelect = UNSAFE_getAllByType(TouchableOpacity);
    onSelect[0].props.onPress();
    onSelect[1].props.onPress();
    expect(toJSON()).toMatchSnapshot();
  });
});
