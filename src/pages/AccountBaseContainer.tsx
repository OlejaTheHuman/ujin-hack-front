import {Outlet, useLocation, useNavigate} from "react-router";
import {Flex, Menu, MenuProps, Space, Typography} from 'antd';

import React, {FormEvent, useEffect} from 'react';

import {SettingOutlined} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'account',
    label: 'Аккаунт',
    type: 'group',
    children: [
      {key: 'main', label: 'Главная'},
      {key: 'profile', label: 'Профиль'},
      {key: 'settings', label: 'Настройки'},
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'app',
    label: 'Приложение',
    icon: <SettingOutlined/>,
    children: [
      {
        key: 'app_1',
        label: 'Меню 1',
      },
      {
        key: 'app_2',
        label: 'Меню 2',
      },
    ],
  },
];

const findLabel = (items: any, key: string): string | undefined => {
  for (const item of items) {
    if (item.key === key) {
      return item.label;
    }

    if (item?.children) {
      const label = findLabel(item.children, key);
      if (label) {
        return label;
      }
    }
  }

  return undefined;
};

interface HUMenuProps {
  onLabelChange?: (label: string) => void;
}

const HUMenu = ({onLabelChange}: HUMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const lastPath = pathParts[pathParts.length - 1];
  const [selectedKey, setSelectedKey] = React.useState<string>(lastPath);

  useEffect(() => {
    if (lastPath === 'account') {
      navigate('/account/main');
    }
    setSelectedKey(lastPath);
    setLabel(lastPath);
  }, [lastPath]);

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    setLabel(e.key);
  };

  function setLabel(key: string) {
    const label = findLabel(items, key);
    if (!label) return;
    onLabelChange?.(label);
  }

  const onLabelChangeHandler = (event: FormEvent<HTMLUListElement>) => {
    const target = event.target as HTMLUListElement;
    const label = target.getAttribute('aria-label');
    if (label) {
      onLabelChange?.(label);
    }
  }

  return (
    <Menu
      onChange={onLabelChangeHandler}
      onClick={onClick}
      style={{width: 256, height: '100vh'}}
      selectedKeys={[selectedKey]}
      mode="inline"
      items={items}
    />
  );
};

export default function AccountBaseContainer() {
  const [selectedName, setSelectedName] = React.useState<string | undefined>(undefined);

  return (
    <Flex style={{height: '100vh', width: '100wv'}}>
      <HUMenu onLabelChange={setSelectedName}/>
      <Flex style={{width: '100%', padding: 20}} vertical justify='start' align='stretch'>
        <Space size='large' direction='vertical'>
          <Typography.Title level={3}>{selectedName}</Typography.Title>
          <Outlet/>
        </Space>
      </Flex>
    </Flex>
  );
}