/**
 * Variants for UI Components
 */
 type UiState = 'primary' | 'info' | 'warning' | 'danger' | 'success';

 /**
  * Returned by vs-input validator
  */
 type InputValidationResult = {
   state: UiState,
   title: string,
   rules?: Array<string>
 } | true;
