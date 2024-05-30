import ConfigStore from "../../store/configStore.ts";
import {Button, Divider, Space, Switch, Typography} from "antd";
import {ExclamationCircleOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {Colors} from "../../consts.ts";
import HUInput from "../../components/HUInput.tsx";
import HUInputPassword from "../../components/HUInputPassword.tsx";
import {useState} from "react";
import {useForm} from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

const SettingsPage = observer(function () {

  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    handleSubmit,
    control,
  } = useForm<FormValues>();

  function handleUpdateUjinAccount() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 700);
  }

  return (
    <Space direction='vertical' size='middle'>

      <Typography.Title level={5}>Кастомизация</Typography.Title>
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

      <Divider/>

      <Typography.Title level={5}>Авторизация в системе ujin</Typography.Title>
      <Typography.Text type="secondary">
        <ExclamationCircleOutlined style={{color: Colors.Warning}}/>
        &nbsp; Используйте данные, которые вводили при регистрации в системе ujin
      </Typography.Text>
      <form>
        <Space direction='vertical'>
          <HUInput
            name='email'
            control={control}
            rules={{
              required: 'Это обязательное поле',
              pattern: {value: /^\S+@\S+\.\S+$/, message: 'Введите валидный email'},
            }}
            variant="filled"
            placeholder="Email"
            onPressEnter={handleSubmit(handleUpdateUjinAccount)}
            autoComplete="email"

          />
          <HUInputPassword
            name='password'
            control={control}
            rules={{
              required: 'Это обязательное поле',
              minLength: {value: 8, message: 'Минимальная длина 8 символов'},
            }}
            variant="filled"
            placeholder="Пароль"
            visibilityToggle={{visible: passwordVisible, onVisibleChange: setPasswordVisible}}
            onPressEnter={handleSubmit(handleUpdateUjinAccount)}
            autoComplete='password'
          />
          <Button
            block
            type="primary"
            loading={loading}
            onClick={handleSubmit(handleUpdateUjinAccount)}
          >
            Авторизоваться в ujin
          </Button>
        </Space>
      </form>
    </Space>
  );
})

export default SettingsPage;