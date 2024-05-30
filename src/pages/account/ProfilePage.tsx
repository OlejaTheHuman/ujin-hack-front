import {Button, Space, Typography} from "antd";
import {useNavigate} from "react-router";
import {LoginOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import UserStore from "../../store/UserStore.ts";

const ProfilePage = observer(() => {
  const navigate = useNavigate();

  function handleExit() {
    UserStore.logout().finally(() => navigate('/login'));
  }

  return (
    <Space direction='vertical' size='large' style={{width: '100%'}}>
      <Space direction='vertical'>
        <Typography.Text>
          Вы вошли как {UserStore.user.userName}
        </Typography.Text>
        <Button danger onClick={handleExit}>
          Выход
          <LoginOutlined/>
        </Button>
      </Space>
    </Space>
  );
})

export default ProfilePage;