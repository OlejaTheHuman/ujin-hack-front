import {Flex} from "antd";
import {Outlet} from "react-router";

export default function AuthBaseContainer() {
  return (
    <Flex style={{height: '100vh'}} justify='center' align='center'>
      <Outlet/>
    </Flex>
  );
}