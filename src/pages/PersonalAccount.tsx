import React from 'react';
import { useNavigate } from 'react-router';
import { SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Sidebar from '../ui-lib/widgets/Sidebar';
import Castle from '../ui-lib/widgets/Castle';

const PersonalAccount: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SplitLayout>
      <SplitCol>
        <Sidebar />
      </SplitCol>
      <SplitCol>Rating, Progress, Achievements</SplitCol>
      <SplitCol>
        <Castle />
      </SplitCol>
    </SplitLayout>
  );
};

export default PersonalAccount;
