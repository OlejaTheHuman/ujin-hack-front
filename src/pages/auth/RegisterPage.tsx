import {useNavigate} from "react-router";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Flex, Space, Typography} from "antd";
import HUInput from "../../components/HUInput.tsx";
import HUInputPassword from "../../components/HUInputPassword.tsx";
import {Link} from "react-router-dom";
import HULogo from "../../components/HULogo.tsx";
import ConfigStore from "../../store/configStore.ts";
import {observer} from "mobx-react";
import UserStore from "../../store/UserStore.ts";

interface FormValues {
  username: string;
  email: string;
  password: string;
  secondPassword: string;
}

const RegisterPage = observer(() => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    watch,
    handleSubmit,
    control,
  } = useForm<FormValues>();

  function handleRegistration(data: FormValues) {
    setLoading(true);
    UserStore.registration({email: data.email, username: data.username, password: data.password})
      .then(() => navigate('login'))
      .finally(() => setLoading(false))
  }

  return (
    <Flex vertical align="center" justify="center" flex="1">
      <Space direction="vertical" size="large" align='center'>
        <HULogo light={ConfigStore.theme === 'light'} width={90}/>

        <Typography.Title style={{textAlign: 'center'}}>
          Регистрация
        </Typography.Title>

        <form>
          <Space style={{width: '100%'}} direction="vertical">
            <HUInput
              name='username'
              control={control}
              rules={{required: 'Это обязательное поле'}}
              variant="filled"
              placeholder="Username"
              onPressEnter={handleSubmit(handleRegistration)}
              autoComplete="username"
            />
            <HUInput
              name='email'
              control={control}
              rules={{
                required: 'Это обязательное поле',
                pattern: {value: /^\S+@\S+\.\S+$/, message: 'Введите валидный email'},
              }}
              variant="filled"
              placeholder="Email"
              onPressEnter={handleSubmit(handleRegistration)}
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
              onPressEnter={handleSubmit(handleRegistration)}
              autoComplete="new-password"
            />
            <HUInputPassword
              name='secondPassword'
              control={control}
              rules={{
                required: 'Это обязательное поле',
                minLength: {value: 8, message: 'Минимальная длина 8 символов'},
                validate: (repPass) => {
                  if (repPass !== watch('password')) return 'Пароли не совпадают';
                },
              }}
              variant="filled"
              placeholder="Пароль"
              visibilityToggle={{visible: passwordVisible, onVisibleChange: setPasswordVisible}}
              onPressEnter={handleSubmit(handleRegistration)}
              autoComplete="new-password"
            />
          </Space>
        </form>

        <Button block type="primary" loading={loading} onClick={handleSubmit(handleRegistration)}>
          Зарегистрироваться
        </Button>

        <Link to='/login'>
          <Typography.Text underline>У меня уже есть аккаунт</Typography.Text>
        </Link>
      </Space>
    </Flex>
  );
});

export default RegisterPage;