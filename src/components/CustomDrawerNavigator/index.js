import React from "react";
import { View } from "react-native";
import { DrawerItems } from "react-navigation";


const CustomDrawerNavigator = props => (
  <View>
    <DrawerItems
      activeBackgroundColor={"black"}
      activeTintColor={"white"}
      {...props}
    />
  </View>
);

export default CustomDrawerNavigator;