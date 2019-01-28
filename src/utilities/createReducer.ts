import { PayloadAction } from 'typesafe-actions/dist/types';

export function createBasicSetValueReducer<State>(
  initial: State,
  setValueActionType: string
) {
  type Action = PayloadAction<string, State>;

  return (prior = initial, action: Action): State => {
    return action.type === setValueActionType ? action.payload : prior;
  };
}
