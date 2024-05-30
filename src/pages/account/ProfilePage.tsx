import {Button} from "antd";
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
    <>
      <Button danger onClick={handleExit}>
        Выход
        <LoginOutlined/>
      </Button>
    </>
  );
})

export default ProfilePage;