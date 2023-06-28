import React from 'react';
import { useNavigate } from 'react-router';
import { SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Sidebar from './Sidebar';
import Castle from './Castle';
import Progress from './Progress';
import Rating from './Rating';

const PersonalAccount: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SplitLayout>
      <SplitCol>
        <Sidebar />
      </SplitCol>
      <SplitCol>
        <Rating />
      </SplitCol>
      <SplitCol>
        <Progress />
      </SplitCol>
      <SplitCol>
        <Castle />
      </SplitCol>
    </SplitLayout>
  );
};

export default PersonalAccount;
