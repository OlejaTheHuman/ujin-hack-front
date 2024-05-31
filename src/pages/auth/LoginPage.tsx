import {Button, Flex, Space, Typography} from 'antd';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {useForm} from "react-hook-form";
import HUInput from "../../components/HUInput.tsx";
import HUInputPassword from "../../components/HUInputPassword.tsx";
import {Link} from "react-router-dom";
import HULogo from "../../components/HULogo.tsx";
import ConfigStore from "../../store/configStore.ts";
import {observer} from "mobx-react";
import UserStore from "../../store/UserStore.ts";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = observer(() => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    handleSubmit,
    control,
  } = useForm<FormValues>();

  function handleLogin(data: FormValues) {
    setLoading(true);

    UserStore.login({email: data.email, password: data.password})
      .then(() => navigate('/account'))
      .finally(() => setLoading(false));
    navigate('/account')
  }

  return (
    <Flex vertical align="center" justify="center" flex="1">
      <Space direction="vertical" size="large" align='center'>
        <HULogo light={ConfigStore.theme === 'light'} width={90}/>

        <Typography.Title style={{textAlign: 'center'}}>Вход</Typography.Title>

        <form>
          <Space style={{width: '100%'}} direction="vertical">
            <HUInput
              name='email'
              control={control}
              rules={{
                required: 'Это обязательное поле',
                pattern: {value: /^\S+@\S+\.\S+$/, message: 'Введите валидный email'},
              }}
              variant="filled"
              placeholder="Email"
              onPressEnter={handleSubmit(handleLogin)}
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
              onPressEnter={handleSubmit(handleLogin)}
              autoComplete='password'
            />
          </Space>
        </form>

        <Button block type="primary" loading={loading} onClick={handleSubmit(handleLogin)}>
          Вход
        </Button>

        <Link to='/registration'>
          <Typography.Text underline>У меня нет аккаунта</Typography.Text>
        </Link>
      </Space>
    </Flex>
  );
})

export default LoginPage;
