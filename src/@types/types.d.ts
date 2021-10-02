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

/**
 * Define position of some UI elements in the viewport
 */
 type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
