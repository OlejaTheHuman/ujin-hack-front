import ConfigStore from "../../store/configStore.ts";
import {Space, Switch, Typography} from "antd";
import {MoonOutlined, SunOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";

const SettingsPage = observer(function () {

  return (
    <Space direction='vertical' size='middle'>
      <Space size='small'>
        <Typography>Выбор темы</Typography>
        <Switch
          onChange={checked => {
            ConfigStore.changeTheme(checked ? 'dark' : 'light');
          }}
          checkedChildren={<MoonOutlined/>}
          unCheckedChildren={<SunOutlined/>}
          checked={ConfigStore.theme === 'dark'}
        />
      </Space>
    </Space>
  );
})

export default SettingsPage;