import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface BasicDatePickerProps {
  value: string;
  onChange: (value: string | null) => void;
}

export default function BasicDatePicker(props: BasicDatePickerProps) {
  const { value, onChange } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Basic date picker"
          value={value}
          onChange={(newValue) => {
            onChange(newValue);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
