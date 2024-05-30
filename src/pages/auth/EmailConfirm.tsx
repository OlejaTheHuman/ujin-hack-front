import {Button, Flex, Space, Typography} from "antd";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import HUInputOpt from "../../components/HUInputOpt.tsx";
import {Link} from "react-router-dom";
import HULogo from "../../components/HULogo.tsx";
import {observer} from "mobx-react";
import ConfigStore from "../../store/configStore.ts";

interface FormValues {
  code: number;
}

const EmailConfirm = observer(() => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
  } = useForm<FormValues>();

  useEffect(() => {
      document.addEventListener('keypress', handleUserKeyPress);
      return () => document.removeEventListener('keypress', handleUserKeyPress);
    }, []);

  function handleEmailConfirm() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 700);
  }

  const handleUserKeyPress = (e: KeyboardEvent) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    handleSubmit(handleEmailConfirm)();
  }

  return (
    <Flex vertical align="center" justify="center" flex="1">
      <Space direction="vertical" size="large" align='center'>
        <HULogo light={ConfigStore.theme === 'light'} width={90}/>

        <Typography.Title style={{textAlign: 'center'}}>
          Подтверждение<br/>
          почты
        </Typography.Title>

        <Typography.Text type='secondary'>Введите код подтверждения с почты</Typography.Text>

        <form>
          <Space style={{width: '100%'}} direction="vertical" align='center'>
            <HUInputOpt
              autoFocus
              name='code'
              control={control}
              rules={{required: 'Это обязательное поле'}}
              variant="filled"
            />
          </Space>
        </form>

        <Button
          style={{width: '100%'}}
          block
          type="primary"
          loading={loading}
          onClick={handleSubmit(handleEmailConfirm)}
        >
          Продолжить
        </Button>

        <Link to={'..'}>
          <Typography.Text underline>
            Назад
          </Typography.Text>
        </Link>
      </Space>
    </Flex>
  );
})

export default EmailConfirm;