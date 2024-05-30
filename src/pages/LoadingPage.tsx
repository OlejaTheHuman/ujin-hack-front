import {Flex, Spin} from "antd";

export default function LoadingPage(){
  return(
    <Flex style={{width: '100%', height: '100vh'}} justify='center' align='center'>
      <Spin/>
    </Flex>
  );
}