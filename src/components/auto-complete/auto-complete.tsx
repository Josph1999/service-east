import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { Language, useLanguage } from '@/contexts/language-context';

import styles from './auto-complete.module.css';

// const options = [
//   {
//     id: '001',
//     name_ka: 'სოციალური მედია',
//     name_eng: 'Social Media',
//   },
//   {
//     id: '002',
//     name_ka: 'ელექტრონიკა',
//     name_eng: 'Electronics',
//   },
//   {
//     id: '003',
//     name_ka: 'კომპიუტერული პროგრამები',
//     name_eng: 'Computer Software',
//   },
//   {
//     id: '004',
//     name_ka: 'ინტერნეტი',
//     name_eng: 'Internet',
//   },
//   {
//     id: '005',
//     name_ka: 'ტექნოლოგიები',
//     name_eng: 'Technology',
//   },
//   {
//     id: '006',
//     name_ka: 'მედიცინა და ჯანმრთელობა',
//     name_eng: 'Medicine and Healthcare',
//   },
//   {
//     id: '007',
//     name_ka: 'ფინანსები',
//     name_eng: 'Finance',
//   },
//   {
//     id: '008',
//     name_ka: 'საჭირო პროდუქტები',
//     name_eng: 'Essential Products',
//   },
//   {
//     id: '009',
//     name_ka: 'სატრანსპორტო საქონელები',
//     name_eng: 'Transportation Goods',
//   },
//   {
//     id: '010',
//     name_ka: 'მედია და დამცველები',
//     name_eng: 'Media and Entertainment',
//   },
//   {
//     id: '011',
//     name_ka: 'ტურიზმი და მოგზაურობა',
//     name_eng: 'Tourism and Travel',
//   },
//   {
//     id: '012',
//     name_ka: 'რესტორანები და კვება',
//     name_eng: 'Restaurants and Food',
//   },
//   {
//     id: '013',
//     name_ka: 'სპორტი და ადგილობრივი აქვსტიკა',
//     name_eng: 'Sports and Recreation',
//   },
//   {
//     id: '014',
//     name_ka: 'სამშენებლო მასალები',
//     name_eng: 'Construction Materials',
//   },
//   {
//     id: '015',
//     name_ka: 'ფერი და დიზაინი',
//     name_eng: 'Fashion and Design',
//   },
//   {
//     id: '016',
//     name_ka: 'მედია და პრესა',
//     name_eng: 'Media and Publishing',
//   },
//   {
//     id: '017',
//     name_ka: 'ინჟინერია და მანქანატრება',
//     name_eng: 'Engineering and Machinery',
//   },
//   {
//     id: '018',
//     name_ka: 'საბიზნო სერვისები',
//     name_eng: 'Business Services',
//   },
// ];

export interface OptionInterface {
  id: string;
  name_ka: string;
  name_eng: string;
}

interface AutoCompleteProps {
  options: OptionInterface[];
  onChange: (option: OptionInterface) => void;
  value: OptionInterface;
}

export default function AutoComplete(props: AutoCompleteProps): React.JSX.Element {
  const { language, renderLanguage } = useLanguage();

  const { onChange, options, value } = props;

  return (
    <Autocomplete
      disablePortal
      value={value}
      id="combo-box-demo"
      options={options}
      onChange={(e, val) => {
        onChange(val!);
      }}
      getOptionLabel={(option) => (language === Language.KA ? option.name_ka : option.name_eng)} // Display English name in input field
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={renderLanguage('აირჩიეთ კატეგორია', 'Select Category')} />}
      renderOption={(prop, option) => {
        const label = language === Language.KA ? option.name_ka : option.name_eng;
        return <li {...prop}>{label}</li>;
      }}
      className={styles.autoComplete}
    />
  );
}
