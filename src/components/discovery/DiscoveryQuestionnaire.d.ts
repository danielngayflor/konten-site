import type { FC } from 'react';

interface DiscoveryQuestionnaireProps {
  endpoint?: string | null;
  onExit?: () => void;
}

declare const DiscoveryQuestionnaire: FC<DiscoveryQuestionnaireProps>;
export default DiscoveryQuestionnaire;
