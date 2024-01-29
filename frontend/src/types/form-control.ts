import type { Control, FieldValues } from 'react-hook-form';

export type FormControl<Fields extends FieldValues> = Control<Fields, any>;