import React from 'react';
import { ModelSettings } from '@/types/playground';
import { ModelSettingsModal } from './ModelSettingsModal';

interface ModelSettingsModalContainerProps {
  modelSettings: ModelSettings;
}

export const ModelSettingsModalContainer = React.memo(({ 
  modelSettings 
}: ModelSettingsModalContainerProps) => {
  return (
    <ModelSettingsModal 
      isOpen={modelSettings.isOpen}
      onClose={modelSettings.closeSettings}
      model={modelSettings.settings.model}
      temperature={modelSettings.settings.temperature}
      maxTokens={modelSettings.settings.maxTokens}
      onModelChange={modelSettings.updateModel}
      onTemperatureChange={modelSettings.updateTemperature}
      onMaxTokensChange={modelSettings.updateMaxTokens}
      onSave={modelSettings.saveSettings}
      availableModels={modelSettings.availableModels}
    />
  );
}); 