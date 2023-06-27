import React from 'react';
import { useNavigate } from 'react-router';
import { Tabs, TabsItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Tabs>
      <TabsItem />
      <TabsItem />
      <TabsItem />
    </Tabs>
  );
};

export default Sidebar;
