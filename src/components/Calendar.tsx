import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { nbNO } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/nb';

export default function Calendar() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="nb"
      localeText={nbNO.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <DateCalendar />
    </LocalizationProvider>
  );
}
