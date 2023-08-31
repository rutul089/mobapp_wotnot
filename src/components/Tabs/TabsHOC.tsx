import React from 'react';
import { ScrollView } from 'react-native';

const TabsHOC = ({
  children,
  scrollViewProps,
  isScrollableTabs,
  defaultTabAsScrollable,
}: any) => {
  if (isScrollableTabs || defaultTabAsScrollable) {
    return (
      <ScrollView
        scrollEnabled={isScrollableTabs ? true : defaultTabAsScrollable}
        horizontal
        showsHorizontalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    );
  } else {
    return <>{children}</>;
  }
};

export default TabsHOC;
