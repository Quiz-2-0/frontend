import React from 'react';
import { useNavigate } from 'react-router';
import { SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Sidebar from '../ui-lib/widgets/Sidebar';
import Castle from '../ui-lib/widgets/Castle';
import Achives from '../ui-lib/widgets/Achives';

const PersonalAccount: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SplitLayout>
      <SplitCol>
        <Sidebar />
      </SplitCol>
      <SplitCol>
        <Achives />
      </SplitCol>
      <SplitCol>
        <Castle />
      </SplitCol>
    </SplitLayout>
  );
};

export default PersonalAccount;
